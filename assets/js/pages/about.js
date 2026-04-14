import { Component, html, parseMarkdown } from '../core/component.js';
import { store } from '../core/store.js';

/**
 * About Page Component
 */
export class AboutPage extends Component {
  constructor() {
    super('#content');
  }

  async onMount() {
    store.set({ currentPage: 'about', loading: true });
    
    try {
      const response = await fetch('/content/about.md');
      const markdown = await response.text();
      this.setState({ content: parseMarkdown(markdown), loading: false });
    } catch (error) {
      this.setState({ 
        content: this.getFallbackContent(),
        loading: false 
      });
    }
    
    store.set({ loading: false });
  }

  getFallbackContent() {
    return `
      <h1>O projektu</h1>
      <p>Tento projekt demonstruje, jak vytvořit moderní webovou aplikaci pouze s nativními technologiemi prohlížeče.</p>
      
      <h2>Proč bez build procesu?</h2>
      <ul>
        <li><strong>Jednoduchost</strong> — Žádná konfigurace, žádné závislosti</li>
        <li><strong>Rychlost vývoje</strong> — Změny se projeví okamžitě</li>
        <li><strong>Debugging</strong> — Kód v prohlížeči odpovídá zdrojovému kódu</li>
        <li><strong>Učení</strong> — Pochopení základů bez abstrakcí</li>
      </ul>

      <h2>Kdy použít?</h2>
      <p>Tento přístup je ideální pro:</p>
      <ul>
        <li>Malé až střední projekty</li>
        <li>Prototypování a MVP</li>
        <li>Dokumentační stránky</li>
        <li>Osobní portfolia</li>
        <li>Výukové projekty</li>
      </ul>

      <h2>Technologie</h2>
      <ul>
        <li><strong>ES Modules</strong> — Nativní moduly v prohlížeči</li>
        <li><strong>CSS Custom Properties</strong> — Theming bez preprocessoru</li>
        <li><strong>Fetch API</strong> — Načítání obsahu</li>
        <li><strong>Hash Router</strong> — Navigace bez serveru</li>
      </ul>
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
          <h3>Rozšíření projektu</h3>
          <p>Přidejte novou stránku vytvořením souboru v <code>/pages</code> a registrací route v <code>app.js</code>.</p>
          <pre><code>// V app.js
router.on('/nova-stranka', async () => {
  const { NovaStranka } = await import('./pages/nova.js');
  new NovaStranka().mount();
});</code></pre>
        </div>
      </article>
    `;
  }
}

export default AboutPage;
