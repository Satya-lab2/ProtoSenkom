/* ============================================
   DAUR.IN — Hash-based SPA Router
   ============================================ */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentCleanup = null;
    this.container = null;
  }

  init(container) {
    this.container = container;
    window.addEventListener('hashchange', () => this.handleRoute());
    // Do NOT call handleRoute here; main.js controls initial routing
  }

  register(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path) {
    window.location.hash = path;
  }

  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    
    // Find matching route
    let handler = this.routes.get(hash);
    let params = {};

    if (!handler) {
      // Try pattern matching for dynamic routes
      for (const [pattern, h] of this.routes) {
        const regex = new RegExp('^' + pattern.replace(/:([^/]+)/g, '([^/]+)') + '$');
        const match = hash.match(regex);
        if (match) {
          handler = h;
          const paramNames = [...pattern.matchAll(/:([^/]+)/g)].map(m => m[1]);
          paramNames.forEach((name, i) => {
            params[name] = match[i + 1];
          });
          break;
        }
      }
    }

    if (!handler) {
      // Default fallback
      this.navigate('/warga/home');
      return;
    }

    // Cleanup previous page
    if (this.currentCleanup && typeof this.currentCleanup === 'function') {
      this.currentCleanup();
    }

    // Animate page transition
    if (this.currentRoute) {
      this.container.classList.add('page-exit');
      await new Promise(r => setTimeout(r, 150));
      this.container.classList.remove('page-exit');
    }

    this.currentRoute = hash;

    // Render new page
    const result = await handler(params);
    
    if (typeof result === 'string') {
      this.container.innerHTML = result;
    }

    // Store cleanup function if returned
    if (result && typeof result === 'object' && result.cleanup) {
      this.currentCleanup = result.cleanup;
    } else {
      this.currentCleanup = null;
    }

    // Animate in
    this.container.classList.add('page-enter');
    setTimeout(() => {
      this.container.classList.remove('page-enter');
    }, 350);

    // Scroll to top
    this.container.scrollTop = 0;
  }

  getCurrentRoute() {
    return window.location.hash.slice(1) || '/';
  }
}

export const router = new Router();
