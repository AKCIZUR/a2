/**
 * Base Component Class
 * Lightweight reactive component system using native ES modules
 */
export class Component {
  constructor(selector) {
    this.el = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    this.state = {};
    this._mounted = false;
  }

  /**
   * Set state and trigger re-render
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  /**
   * Lifecycle: Called before first render
   */
  onMount() {}

  /**
   * Lifecycle: Called after each render
   */
  onUpdate() {}

  /**
   * Lifecycle: Called when component is destroyed
   */
  onDestroy() {}

  /**
   * Override this method to define component template
   */
  render() {
    return '';
  }

  /**
   * Mount component to DOM
   */
  mount() {
    if (!this.el) {
      console.warn('Component: No element found');
      return this;
    }
    
    this.onMount();
    this.update();
    this._mounted = true;
    return this;
  }

  /**
   * Update DOM with new render output
   */
  update() {
    if (this.el) {
      this.el.innerHTML = this.render();
      this.onUpdate();
      this.bindEvents();
    }
  }

  /**
   * Override to bind event listeners after render
   */
  bindEvents() {}

  /**
   * Destroy component and cleanup
   */
  destroy() {
    this.onDestroy();
    if (this.el) {
      this.el.innerHTML = '';
    }
    this._mounted = false;
  }
}

/**
 * Create a simple functional component
 */
export function createComponent(renderFn) {
  return (selector, props = {}) => {
    const el = document.querySelector(selector);
    if (el) {
      el.innerHTML = renderFn(props);
    }
    return el;
  };
}

/**
 * HTML template tag for syntax highlighting support
 */
export function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ?? '';
    return result + str + (Array.isArray(value) ? value.join('') : value);
  }, '');
}

/**
 * Simple markdown parser (basic support)
 */
export function parseMarkdown(md) {
  return md
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold & Italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\- (.+)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)\n(?!<li>)/g, '<ul>$1</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[huplo])/gm, '<p>')
    .replace(/<p><\/p>/g, '')
    // Cleanup
    .replace(/<p>(<[huplo])/g, '$1')
    .replace(/(<\/[huplo]\w*>)<\/p>/g, '$1');
}
