import { loadContentIndex, loadMarkdown } from './core/contentLoader.js';
import { registerRoute, startRouter } from './core/router.js';

const app = document.getElementById('app');

function renderSidebar(tree) {
  function renderItems(items) {
    return `<ul>${items.map(item => {
      if (item.children) {
        return `<li><details><summary>${item.title}</summary>${renderItems(item.children)}</details></li>`;
      }
      return `<li><a href="#${item.path}">${item.title}</a></li>`;
    }).join('')}</ul>`;
  }
  return renderItems(tree);
}

function flatten(tree) {
  let result = [];
  for (const item of tree) {
    if (item.file) result.push(item);
    if (item.children) result = result.concat(flatten(item.children));
  }
  return result;
}

async function init() {
  const tree = await loadContentIndex();

  app.innerHTML = `
    <aside class="sidebar"><div id="nav"></div></aside>
    <main class="content"><div id="content">Loading...</div></main>
  `;

  document.getElementById("nav").innerHTML = renderSidebar(tree);

  const flat = flatten(tree);

  flat.forEach(page => {
    registerRoute(page.path, async () => {
      const md = await loadMarkdown(page.file);
      document.getElementById("content").innerHTML = marked.parse(md);
      window.scrollTo(0,0);
    });
  });

  startRouter();
}

init();
