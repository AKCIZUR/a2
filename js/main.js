import { renderHeader } from './components/header.js';
import { router } from './router.js';

const app = document.getElementById('app');
const cursor = document.getElementById('cursor');

function renderApp() {
  app.innerHTML = `${renderHeader()}<div id="view"></div>`;
  wireEvents();
  router();
}

function wireEvents() {
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-scroll');
      if (!target) return;

      if (target === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const node = document.querySelector(target);
      if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
    const btn = wrap.querySelector('button');
    if (!btn) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    wrap.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  const navButton = document.querySelector('.nav__scroll');
  if (navButton) {
    navButton.addEventListener('click', () => {
      const target = document.querySelector(navButton.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function initCursor() {
  if (!cursor) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  const tick = () => {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    requestAnimationFrame(tick);
  };
  tick();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  initCursor();
  renderApp();
});
