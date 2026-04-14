const routes = new Map();

export function registerRoute(path, handler) {
  routes.set(path, handler);
}

export function getCurrentPath() {
  let hash = location.hash;
  if (!hash) {
    location.hash = "#/";
    return "/";
  }
  return hash.replace("#", "");
}

export function startRouter() {
  function render() {
    const path = getCurrentPath();
    const handler = routes.get(path);
    if (handler) handler();
    else document.getElementById("content").innerHTML = "<h1>404</h1>";
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("load", render);
  render();
}
