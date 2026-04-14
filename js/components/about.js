export function About() {
  return `
    <main class="page about shell">
      <section class="about__hero">
        <article class="glass-card about__panel reveal">
          <div class="eyebrow">About</div>
          <h1>Elegantní základ pro statický web.</h1>
          <p>
            Tahle varianta drží jednoduchou strukturu, ale vizuálně se posouvá do luxusního směru:
            tmavé pozadí, sklo, jemné gradienty, výrazná typografie a lehké motion efekty.
          </p>
          <div class="hero__actions" style="margin-top:24px">
            <span class="magnetic-wrap"><button class="btn btn--primary" data-scroll="#contact" type="button">Kontakt</button></span>
            <span class="magnetic-wrap"><button class="btn" data-scroll="#showcase" type="button">Zpět na ukázku</button></span>
          </div>
        </article>

        <div class="about__list">
          <article class="glass-card about__item reveal">
            <div><strong>Bez buildu</strong><span>Stačí otevřít index.html nebo nasadit na GitHub Pages.</span></div>
            <span class="muted">Static</span>
          </article>
          <article class="glass-card about__item reveal">
            <div><strong>Modulární JS</strong><span>Header, router a komponenty lze přidávat po částech.</span></div>
            <span class="muted">ESM</span>
          </article>
          <article class="glass-card about__item reveal">
            <div><strong>Design-first</strong><span>Page je stavěná tak, aby už na první pohled působila „premium“.</span></div>
            <span class="muted">UX</span>
          </article>
        </div>
      </section>

      <section class="section">
        <article class="glass-card feature reveal">
          <h3>Co jde dál doplnit</h3>
          <p>Animovaný scroll progress, route transitions, vlastní sekce services, reference, pricing a kontaktní formulář bez napojení na framework.</p>
          <div class="chips"><span class="chip">Transitions</span><span class="chip">Pricing</span><span class="chip">Forms</span><span class="chip">Portfolio</span></div>
        </article>
      </section>
    </main>
  `;
}
