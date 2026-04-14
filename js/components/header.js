export function renderHeader() {
  return `
    <header class="topbar">
      <div class="shell topbar__inner">
        <a class="brand" href="#/">
          <span class="brand__mark" aria-hidden="true"></span>
          <span class="brand__text">
            Design Skeleton
            <span>ES Modules landing</span>
          </span>
        </a>

        <nav class="nav" aria-label="Hlavní navigace">
          <a href="#/">Home</a>
          <a href="#/about">About</a>
          <button class="nav__scroll" data-scroll="#contact" type="button">Contact</button>
        </nav>
      </div>
    </header>
  `;
}
