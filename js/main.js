import { renderHeader } from './components/header.js';
import { router } from './router.js';

const app = document.getElementById('app');

function render() {
    app.innerHTML = `
        ${renderHeader()}
        <main id="view"></main>
    `;
    router();
}

window.addEventListener('hashchange', router);

render();
