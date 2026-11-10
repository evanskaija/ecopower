/* Shared EcoPower theme preference. This runs before the page styles to avoid a flash. */
(() => {
  const storageKey = 'ecopower-theme';
  const isTheme = (value) => value === 'light' || value === 'dark';
  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return isTheme(value) ? value : null;
    } catch {
      return null;
    }
  };
  const systemTheme = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const initialTheme = readStoredTheme() || systemTheme();

  const applyTheme = (theme, persist) => {
    const nextTheme = isTheme(theme) ? theme : 'light';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    if (persist) {
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch {
        // Private browsing or a restricted storage context should not break the toggle.
      }
    }
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const isDark = nextTheme === 'dark';
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    });
    window.dispatchEvent(new CustomEvent('ecopower-theme-change', { detail: { theme: nextTheme } }));
  };

  // Set the attribute immediately while this script is still in <head>.
  applyTheme(initialTheme, false);

  window.EcoPowerTheme = {
    get: () => document.documentElement.dataset.theme || initialTheme,
    set: (theme) => applyTheme(theme, true),
    toggle: () => applyTheme((document.documentElement.dataset.theme || initialTheme) === 'dark' ? 'light' : 'dark', true)
  };

  const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  if (mediaQuery) {
    const onSystemThemeChange = () => {
      if (!readStoredTheme()) applyTheme(systemTheme(), false);
    };
    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onSystemThemeChange);
    else if (mediaQuery.addListener) mediaQuery.addListener(onSystemThemeChange);
  }

  const createToggle = (isAdmin) => {
    const button = document.createElement('button');
    button.className = isAdmin ? 'theme-toggle admin-theme-toggle' : 'theme-toggle';
    button.type = 'button';
    button.setAttribute('data-theme-toggle', '');
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = '<span class="theme-toggle-icon theme-toggle-sun" aria-hidden="true">&#9728;</span><span class="theme-toggle-icon theme-toggle-moon" aria-hidden="true">&#9790;</span><span class="sr-only">Toggle color theme</span>';
    return button;
  };

  const initialiseControls = () => {
    document.querySelectorAll('.nav-actions').forEach((actions) => {
      if (!actions.querySelector('[data-theme-toggle]')) actions.prepend(createToggle(false));
    });
    document.querySelectorAll('.admin-top-actions').forEach((actions) => {
      if (!actions.querySelector('[data-theme-toggle]')) {
        const divider = actions.querySelector('.admin-top-divider');
        actions.insertBefore(createToggle(true), divider || actions.firstChild);
      }
    });
    applyTheme(document.documentElement.dataset.theme || initialTheme, false);
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-theme-toggle]');
      if (button) window.EcoPowerTheme.toggle();
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseControls, { once: true });
  else initialiseControls();
})();
