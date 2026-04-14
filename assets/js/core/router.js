/**
 * Simple Hash-based Router
 * Uses hash navigation for static file compatibility
 */
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.beforeHooks = [];
    this.afterHooks = [];
    
    // Listen to hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  /**
   * Register a route
   * @param {string} path - Route path (e.g., '/home', '/about/:id')
   * @param {Function} handler - Async function that returns page content or component
   */
  on(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  /**
   * Add middleware to run before route change
   */
  beforeEach(hook) {
    this.beforeHooks.push(hook);
    return this;
  }

  /**
   * Add middleware to run after route change
   */
  afterEach(hook) {
    this.afterHooks.push(hook);
    return this;
  }

  /**
   * Navigate to a route programmatically
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Get current path from hash
   */
  getPath() {
    const hash = window.location.hash.slice(1) || '/';
    return hash.startsWith('/') ? hash : '/' + hash;
  }

  /**
   * Parse route parameters
   */
  parseParams(routePath, currentPath) {
    const routeParts = routePath.split('/');
    const pathParts = currentPath.split('/');
    const params = {};

    if (routeParts.length !== pathParts.length) return null;

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        return null;
      }
    }

    return params;
  }

  /**
   * Find matching route
   */
  matchRoute(path) {
    // Exact match first
    if (this.routes.has(path)) {
      return { handler: this.routes.get(path), params: {} };
    }

    // Dynamic route matching
    for (const [routePath, handler] of this.routes) {
      const params = this.parseParams(routePath, path);
      if (params) {
        return { handler, params };
      }
    }

    return null;
  }

  /**
   * Handle route change
   */
  async handleRoute() {
    const path = this.getPath();
    const match = this.matchRoute(path);

    // Run before hooks
    for (const hook of this.beforeHooks) {
      const result = await hook(path, this.currentRoute);
      if (result === false) return;
    }

    const previousRoute = this.currentRoute;
    this.currentRoute = path;

    if (match) {
      try {
        await match.handler(match.params);
      } catch (error) {
        console.error('Router error:', error);
        this.handleNotFound();
      }
    } else {
      this.handleNotFound();
    }

    // Run after hooks
    for (const hook of this.afterHooks) {
      await hook(path, previousRoute);
    }
  }

  /**
   * Handle 404
   */
  handleNotFound() {
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML = `
        <div class="page-enter">
          <h1>404</h1>
          <p>Stránka nebyla nalezena.</p>
          <a href="#/" class="btn">Zpět na úvod</a>
        </div>
      `;
    }
  }

  /**
   * Start the router
   */
  start() {
    this.handleRoute();
    return this;
  }
}

// Singleton instance
export const router = new Router();
export default router;
