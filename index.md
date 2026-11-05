---
layout: home
title: 索引
---

<style>
  #theme-toggle {
    position: fixed !important;
    top: 16px !important;
    right: 16px !important;
    z-index: 2147483647 !important;
    display: grid !important;
    width: 44px !important;
    height: 44px !important;
    place-items: center !important;
    padding: 0 !important;
    border: 1px solid #777 !important;
    border-radius: 50% !important;
    background: #fff !important;
    color: #222 !important;
    cursor: pointer !important;
    -webkit-appearance: none !important;
    appearance: none !important;
  }
  #theme-toggle svg {
    display: block;
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  html[data-theme="dark"] #theme-toggle {
    background: #22262b !important;
    color: #fff !important;
  }
</style>

<button id="theme-toggle" type="button" aria-label="Switch to dark mode" aria-pressed="false">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>
</button>
<script>
(function () {
  var key = 'billyshaw8-theme';
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var sun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
  var moon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
  function readTheme() {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function apply(theme) {
    var dark = theme === 'dark';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    button.innerHTML = dark ? sun : moon;
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }
  var saved = readTheme();
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));
  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(key, next); } catch (e) {}
  });
})();
</script>
