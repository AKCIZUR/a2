/**
 * Main Application Entry Point
 * Initializes router, components, and global state
 */
import { router } from './core/router.js';
import { store } from './core/store.js';
import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';

// Initialize global components
const navbar = new Navbar().mount();
const footer = new Footer().mount();

// Configure routes with lazy loading
router
  .on('/', async () => {
    const { HomePage } = await import('./pages/home.js');
    new HomePage().mount();
  })
  .on('/about', async () => {
    const { AboutPage } = await import('./pages/about.js');
    new AboutPage().mount();
  });

// Global navigation hooks
router.beforeEach((to, from) => {
  // Show loading state
  const content = document.getElementById('content');
  if (content && to !== from) {
    content.innerHTML = '<div class="loading"></div>';
  }
  return true;
});

router.afterEach((to) => {
  // Update document title based on route
  const titles = {
    '/': 'Úvod | ModularJS',
    '/about': 'O projektu | ModularJS',
  };
  document.title = titles[to] || 'ModularJS';
  
  // Scroll to top on navigation
  window.scrollTo(0, 0);
});

// Start the router
router.start();

// Debug info in console
console.log(
  '%c🚀 ModularJS',
  'color: #3b82f6; font-size: 16px; font-weight: bold;',
  '\nNativní ES Modules • Zero Build • Pure JavaScript'
);

// Export for debugging
window.__app = { router, store, navbar, footer };
