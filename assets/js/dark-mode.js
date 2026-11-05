(function () {
  const storageKey = 'billyshaw8-theme';
  const darkPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;

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
    if (button) {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.textContent = isDark ? '☀️' : '🌙';
    }
  }

  const savedTheme = getSavedTheme();
  applyTheme(savedTheme || (darkPreference.matches ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.site-nav');
    if (!nav || document.getElementById('theme-toggle')) return;

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
        // The toggle still works for this page when storage is unavailable.
      }
    });

    nav.appendChild(button);
    applyTheme(root.dataset.theme);
  });
})();
