import { Component, html } from '../core/component.js';

/**
 * Footer Component
 */
export class Footer extends Component {
  constructor() {
    super('#footer');
  }

  render() {
    const year = new Date().getFullYear();
    
    return html`
      <footer class="footer">
        <p>
          © ${year} ModularJS — 
          Postaveno s <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank" rel="noopener">ES Modules</a>
        </p>
        <p style="margin-top: 0.5rem; font-size: 0.75rem;">
          Žádný build proces • Čistý JavaScript • Zero dependencies
        </p>
      </footer>
    `;
  }
}

export default Footer;
