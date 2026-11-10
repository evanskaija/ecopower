'use strict';

// Images are shared content. Text and image metadata (such as alt text) may
// remain language-specific, but a page item must never point at a different
// image merely because the visitor selected another language.
function clone(value) {
  if (value === undefined || value === null) return value;
  return JSON.parse(JSON.stringify(value));
}

function isImageFieldKey(key, parent) {
  const normalized = String(key || '').replace(/[-_]/g, '').toLowerCase();
  if (parent?.kind === 'image' && normalized === 'value') return true;
  return /(?:image|photo|logo|avatar|thumbnail|icon|qr)$/.test(normalized)
    || /(?:image|photo|logo|avatar|thumbnail|icon|qr)(?:url|src)$/.test(normalized);
}

function isImageValue(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isMediaReference(value) {
  return typeof value === 'string' && value.startsWith('media:');
}

function chooseImage(left, right, leftUpdatedAt, rightUpdatedAt) {
  if (left === right) return { value: left, reason: 'same' };
  if (!isImageValue(left)) return { value: right, reason: 'right-only' };
  if (!isImageValue(right)) return { value: left, reason: 'left-only' };

  // A media marker is an explicit CMS asset selection. Prefer it over a
  // legacy bundled path or an older materialized URL.
  if (isMediaReference(left) !== isMediaReference(right)) {
    return { value: isMediaReference(left) ? left : right, reason: 'media-reference' };
  }

  const leftTime = Date.parse(leftUpdatedAt || '');
  const rightTime = Date.parse(rightUpdatedAt || '');
  if (Number.isFinite(leftTime) && Number.isFinite(rightTime) && leftTime !== rightTime) {
    return { value: leftTime > rightTime ? left : right, reason: 'latest-record' };
  }

  // When old records do not contain enough history, keep the EN value as the
  // deterministic fallback and expose the path for administrator review.
  return { value: left, reason: 'english-fallback' };
}

function reconcileSharedImages(leftContent, rightContent, options = {}) {
  const left = clone(leftContent) || {};
  const right = clone(rightContent) || {};
  const conflicts = [];
  const leftUpdatedAt = options.leftUpdatedAt;
  const rightUpdatedAt = options.rightUpdatedAt;

  function visit(leftNode, rightNode, path = []) {
    if (Array.isArray(leftNode) || Array.isArray(rightNode)) {
      const leftItems = Array.isArray(leftNode) ? leftNode : [];
      const rightItems = Array.isArray(rightNode) ? rightNode : [];
      const identity = (item) => item && typeof item === 'object' && !Array.isArray(item) ? (item.id || item.field_id || '') : '';
      const hasStableIdentity = leftItems.some((item) => identity(item)) || rightItems.some((item) => identity(item));
      if (hasStableIdentity) {
        const originalLeft = leftItems.slice();
        const originalRight = rightItems.slice();
        const canPropagateCatalogItem = path.some((segment) => /catalog/i.test(String(segment)) || String(segment) === 'items')
          && !path.some((segment) => ['blocks', 'elements'].includes(String(segment)));
        for (let index = 0; index < originalLeft.length; index += 1) {
          const leftItem = originalLeft[index];
          const key = identity(leftItem);
          if (!key) continue;
          const rightIndex = rightItems.findIndex((item) => identity(item) === key);
          if (rightIndex >= 0) visit(leftItem, rightItems[rightIndex], [...path, index]);
          else if (canPropagateCatalogItem) rightItems.splice(Math.min(index, rightItems.length), 0, clone(leftItem));
        }
        for (let index = 0; index < originalRight.length; index += 1) {
          const rightItem = originalRight[index];
          const key = identity(rightItem);
          if (!key) continue;
          const leftIndex = leftItems.findIndex((item) => identity(item) === key);
          if (leftIndex >= 0) visit(leftItems[leftIndex], rightItem, [...path, index]);
          else if (canPropagateCatalogItem) leftItems.splice(Math.min(index, leftItems.length), 0, clone(rightItem));
        }
        return;
      }
      const length = Math.max(leftItems.length, rightItems.length);
      for (let index = 0; index < length; index += 1) {
        if (leftItems[index] !== undefined && rightItems[index] !== undefined) visit(leftItems[index], rightItems[index], [...path, index]);
      }
      return;
    }
    if (!leftNode || typeof leftNode !== 'object' || !rightNode || typeof rightNode !== 'object') return;

    const keys = new Set([...Object.keys(leftNode), ...Object.keys(rightNode)]);
    const imageKeys = [...keys].filter((key) => isImageFieldKey(key, leftNode) || isImageFieldKey(key, rightNode));
    const hasImage = imageKeys.length > 0;
    const primaryImageKey = imageKeys[0];
    const primaryChoice = primaryImageKey ? chooseImage(leftNode[primaryImageKey], rightNode[primaryImageKey], leftUpdatedAt, rightUpdatedAt) : null;
    const preferRightPosition = primaryChoice && primaryChoice.value === rightNode[primaryImageKey] && primaryChoice.value !== leftNode[primaryImageKey];
    for (const key of keys) {
      const leftValue = leftNode[key];
      const rightValue = rightNode[key];
      const sharedPosition = hasImage && /^(?:position|imageposition)$/i.test(key);
      const imageField = isImageFieldKey(key, leftNode) || isImageFieldKey(key, rightNode);
      if (imageField || sharedPosition) {
        if (!isImageValue(leftValue) && !isImageValue(rightValue)) continue;
        const chosen = sharedPosition && !imageField
          ? { value: preferRightPosition ? (rightValue || leftValue) : (leftValue || rightValue), reason: 'image-position' }
          : chooseImage(leftValue, rightValue, leftUpdatedAt, rightUpdatedAt);
        if (chosen.value !== undefined) {
          leftNode[key] = chosen.value;
          rightNode[key] = chosen.value;
        }
        if (imageField && leftValue && rightValue && leftValue !== rightValue && chosen.reason === 'english-fallback') {
          conflicts.push({ path: [...path, key].join('.'), english: leftValue, swahili: rightValue, selected: chosen.value });
        }
        continue;
      }
      if ((leftValue && typeof leftValue === 'object') || (rightValue && typeof rightValue === 'object')) {
        visit(leftValue, rightValue, [...path, key]);
      }
    }
  }

  visit(left, right);
  return { left, right, conflicts };
}

function reconcileLanguageRecords(records = {}) {
  const next = Object.fromEntries(Object.entries(records).map(([language, record]) => [
    language,
    record && typeof record === 'object' ? { ...record, content: clone(record.content) } : record
  ]));
  if (!next.en?.content || !next.sw?.content) return { records: next, conflicts: [] };
  const result = reconcileSharedImages(next.en.content, next.sw.content, {
    leftUpdatedAt: next.en.updated_at,
    rightUpdatedAt: next.sw.updated_at
  });
  next.en.content = result.left;
  next.sw.content = result.right;
  return { records: next, conflicts: result.conflicts };
}

module.exports = { isImageFieldKey, reconcileSharedImages, reconcileLanguageRecords };
