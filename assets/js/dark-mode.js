(function () {
  const storageKey = 'billyshaw8-theme';
  const root = document.documentElement;
  const darkPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    button.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
  }

  const savedTheme = getSavedTheme();
  applyTheme(savedTheme || (darkPreference && darkPreference.matches ? 'dark' : 'light'));

  function addToggle() {
    if (document.getElementById('theme-toggle') || !document.body) return;

    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.type = 'button';
    button.className = 'theme-toggle';
    button.addEventListener('click', function () {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // The toggle remains usable if browser storage is unavailable.
      }
    });

    document.body.appendChild(button);
    applyTheme(root.dataset.theme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle, { once: true });
  } else {
    addToggle();
  }
})();
