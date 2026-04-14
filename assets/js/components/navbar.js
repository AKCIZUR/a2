import { Component, html } from '../core/component.js';
import { router } from '../core/router.js';

/**
 * Navigation Component
 */
export class Navbar extends Component {
  constructor() {
    super('#navbar');
    this.links = [
      { path: '/', label: 'Úvod' },
      { path: '/about', label: 'O projektu' },
    ];
  }

  onMount() {
    // Update active state on route change
    router.afterEach((path) => {
      this.setState({ currentPath: path });
    });
    
    this.state = {
      currentPath: router.getPath()
    };
  }

  render() {
    const { currentPath } = this.state;
    
    return html`
      <nav class="navbar">
        <div class="navbar__container">
          <a href="#/" class="navbar__logo">
            ModularJS
          </a>
          <ul class="navbar__links">
            ${this.links.map(link => html`
              <li>
                <a 
                  href="#${link.path}" 
                  class="navbar__link ${currentPath === link.path ? 'active' : ''}"
                >
                  ${link.label}
                </a>
              </li>
            `)}
          </ul>
        </div>
      </nav>
    `;
  }
}

export default Navbar;
