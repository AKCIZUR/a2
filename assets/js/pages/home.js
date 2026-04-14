import { Component, html, parseMarkdown } from '../core/component.js';
import { store } from '../core/store.js';

/**
 * Home Page Component
 */
export class HomePage extends Component {
  constructor() {
    super('#content');
  }

  async onMount() {
    store.set({ currentPage: 'home', loading: true });
    
    try {
      // Fetch markdown content
      const response = await fetch('/content/home.md');
      const markdown = await response.text();
      this.setState({ content: parseMarkdown(markdown), loading: false });
    } catch (error) {
      // Fallback content if fetch fails
      this.setState({ 
        content: this.getFallbackContent(),
        loading: false 
      });
    }
    
    store.set({ loading: false });
  }

  getFallbackContent() {
    return `
      <h1>Modulární Static Web</h1>
      <p>Vítejte v ukázkovém projektu, který demonstruje použití nativních ES Modules pro vytvoření moderního statického webu bez build procesu.</p>
      
      <h2>Klíčové vlastnosti</h2>
      <ul>
        <li><strong>Zero Build</strong> — Žádný webpack, vite ani jiný bundler</li>
        <li><strong>Nativní ES Modules</strong> — Využití import/export přímo v prohlížeči</li>
        <li><strong>Komponentní systém</strong> — Jednoduchá třída pro reaktivní komponenty</li>
        <li><strong>Hash Router</strong> — SPA navigace bez serveru</li>
        <li><strong>State Management</strong> — Pub/Sub store pro sdílený stav</li>
      </ul>

      <h2>Struktura projektu</h2>
      <pre><code>/project
├── index.html
├── /assets
│   ├── /css/styles.css
│   └── /js
│       ├── core/        # Router, Component, Store
│       ├── components/  # Navbar, Footer
│       ├── pages/       # Home, About
│       └── app.js       # Entry point
└── /content             # Markdown obsah</code></pre>
    `;
  }

  render() {
    const { content, loading } = this.state;

    if (loading) {
      return html`<div class="loading"></div>`;
    }

    return html`
      <article class="page-enter">
        ${content || ''}
        
        <div class="card" style="margin-top: 2rem;">
          <h3>Začněte hned</h3>
          <p>Tento projekt můžete použít jako základ pro vlastní statický web.</p>
          <a href="#/about" class="btn">
            Více o projektu →
          </a>
        </div>
      </article>
    `;
  }
}

export default HomePage;
