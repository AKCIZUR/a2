import { Home } from './components/home.js';
import { About } from './components/about.js';

export function router() {
  const view = document.getElementById('view');
  if (!view) return;

  const route = location.hash.slice(1) || '/';
  const routes = { '/': Home, '/about': About };
  const page = routes[route] || (() => `
    <main class="page shell">
      <section class="section">
        <div class="glass-card feature reveal is-visible">
          <div class="eyebrow">404</div>
          <h3>Stránka nenalezena</h3>
          <p>Požadovaná cesta neexistuje. Vrať se na home.</p>
        </div>
      </section>
    </main>
  `);

  view.innerHTML = page();
  window.scrollTo({ top: 0, behavior: 'auto' });
  requestAnimationFrame(() => initReveal());
}

function initReveal() {
  const items = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
}
