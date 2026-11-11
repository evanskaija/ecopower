/* Shared EcoPower logo preloader. Full animation runs on first entry and refresh; */
/* same-tab internal navigation sets a one-time skip flag for the next page. */
(() => {
  const root = document.documentElement;
  const skipKey = 'ecopower-preloader-skip-next';
  const introDuration = 2000;
  const fallbackDuration = 4000;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
  const navigationType = window.performance?.getEntriesByType?.('navigation')?.[0]?.type;
  const startedAt = Date.now();
  let skipAnimation = false;

  try {
    const skipTimestamp = Number(window.sessionStorage.getItem(skipKey));
    skipAnimation = navigationType === 'back_forward' || (Number.isFinite(skipTimestamp) && Date.now() - skipTimestamp < 2000);
    window.sessionStorage.removeItem(skipKey);
  } catch {
    // If session storage is unavailable, the full animation still works safely.
  }

  if (skipAnimation) root.classList.add('site-preloader-quick');
  else root.classList.add('site-preloader-active');

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    try {
      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      const samePageHash = destination.origin === current.origin && destination.pathname === current.pathname && destination.search === current.search && destination.hash;
      if (destination.origin !== current.origin || samePageHash) return;
      window.sessionStorage.setItem(skipKey, String(Date.now()));
    } catch {
      // Invalid or unavailable navigation data should not affect the page.
    }
  }, true);

  let finished = false;
  let contentReady = false;

  const removeLoader = () => {
    const loader = document.getElementById('site-loader');
    loader?.remove();
    root.classList.remove('site-preloader-active', 'site-preloader-quick');
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    const loader = document.getElementById('site-loader');
    if (!loader) {
      removeLoader();
      return;
    }
    if (skipAnimation || reducedMotion) {
      removeLoader();
      return;
    }
    loader.classList.add('is-exiting');
    loader.addEventListener('transitionend', removeLoader, { once: true });
    window.setTimeout(removeLoader, 560);
  };

  const revealWhenReady = () => {
    if (!contentReady || finished) return;
    const remaining = Math.max(0, introDuration - (Date.now() - startedAt));
    if (remaining) {
      window.setTimeout(revealWhenReady, remaining);
      return;
    }
    finish();
  };

  const markContentReady = () => {
    if (contentReady) return;
    contentReady = true;
    if (skipAnimation || reducedMotion) finish();
    else revealWhenReady();
  };

  const prepare = () => {
    markContentReady();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prepare, { once: true });
  else prepare();
  window.setTimeout(() => {
    if (!finished) {
      contentReady = true;
      finish();
    }
  }, fallbackDuration);
})();
