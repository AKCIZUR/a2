import { loadMarkdown } from './markdown.js';

export async function router() {
    const view = document.getElementById('view');
    const route = location.hash.slice(1) || '/';

    const routes = {
        '/': '/docs/index.md',
        '/about': '/docs/about.md'
    };

    const mdPath = routes[route];

    if (!mdPath) {
        view.innerHTML = '<h1>404</h1>';
        return;
    }

    view.innerHTML = '<p>Loading...</p>';

    const html = await loadMarkdown(mdPath);
    view.innerHTML = html;
}
