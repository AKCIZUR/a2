/**
 * Simple State Management Store
 * Pub/Sub pattern for reactive state
 */
class Store {
  constructor(initialState = {}) {
    this._state = initialState;
    this._listeners = new Map();
    this._middlewares = [];
  }

  /**
   * Get current state or specific key
   */
  get(key) {
    if (key) {
      return this._state[key];
    }
    return { ...this._state };
  }

  /**
   * Set state (partial update)
   */
  set(updates) {
    const prevState = { ...this._state };
    
    // Run middlewares
    for (const middleware of this._middlewares) {
      updates = middleware(updates, prevState) ?? updates;
    }

    this._state = { ...this._state, ...updates };
    
    // Notify listeners
    for (const [key, value] of Object.entries(updates)) {
      this._notify(key, value, prevState[key]);
    }
    
    // Notify global listeners
    this._notify('*', this._state, prevState);
  }

  /**
   * Subscribe to state changes
   * @param {string} key - State key to watch ('*' for all changes)
   * @param {Function} callback - Called with (newValue, oldValue)
   * @returns {Function} Unsubscribe function
   */
  subscribe(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(callback);

    // Return unsubscribe function
    return () => {
      this._listeners.get(key)?.delete(callback);
    };
  }

  /**
   * Add middleware
   */
  use(middleware) {
    this._middlewares.push(middleware);
    return this;
  }

  /**
   * Notify listeners for a specific key
   */
  _notify(key, newValue, oldValue) {
    const listeners = this._listeners.get(key);
    if (listeners) {
      for (const callback of listeners) {
        callback(newValue, oldValue);
      }
    }
  }

  /**
   * Reset state to initial
   */
  reset(initialState = {}) {
    const prevState = this._state;
    this._state = initialState;
    this._notify('*', this._state, prevState);
  }
}

// Create and export singleton store
export const store = new Store({
  // Initial app state
  theme: 'dark',
  language: 'cs',
  currentPage: null,
  loading: false,
});

// Logger middleware (development)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  store.use((updates, prevState) => {
    console.log('%c[Store]', 'color: #3b82f6', updates);
    return updates;
  });
}

export default store;
