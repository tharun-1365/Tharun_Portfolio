/**
 * Inline, render-blocking script that applies the saved theme before first
 * paint so there is no flash of the wrong theme. Also marks <html class="js">
 * so reveal animations only apply when JavaScript is running.
 */
const script = `
(function () {
  try {
    var d = document.documentElement;
    d.classList.add('js');
    var stored = localStorage.getItem('theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : system;
    if (dark) d.classList.add('dark');
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
