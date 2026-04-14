export function Home() {
  return `
    <main class="page">
      <section class="hero">
        <div class="shell hero__grid">
          <div>
            <div class="eyebrow reveal">Premium modular website</div>
            <h1 class="reveal">Precision in motion.</h1>
            <p class="reveal">
              Tohle je moderní dark landing page inspirovaná luxusním motion stylem:
              výrazná typografie, skleněné panely, jemné glowy akcenty a čistá komponentová struktura.
            </p>

            <div class="hero__actions reveal">
              <span class="magnetic-wrap">
                <button class="btn btn--primary" data-scroll="#showcase" type="button">Prohlédnout sekce</button>
              </span>
              <span class="magnetic-wrap">
                <button class="btn" data-scroll="#contact" type="button">Začít projekt</button>
              </span>
            </div>
          </div>

          <div class="hero__panel reveal">
            <div class="hero__card hero__card--top">
              <div class="hero__label">Layout system</div>
              <div class="hero__value">Modular</div>
              <div class="hero__meta"><span>Header / Hero / Grid / CTA</span><span>ES Modules</span></div>
            </div>
            <div class="hero__card hero__card--mid">
              <div class="hero__label">Visual language</div>
              <div class="hero__value">Dark Luxury</div>
              <div class="hero__meta"><span>Glass panels</span><span>Soft gradients</span></div>
            </div>
            <div class="hero__card hero__card--bottom">
              <div class="hero__label">Motion feel</div>
              <div class="hero__value">Smooth</div>
              <div class="hero__meta"><span>Reveal effects</span><span>Magnetic buttons</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section shell">
        <div class="stats">
          <article class="stat glass-card reveal"><div class="stat__num">01</div><div class="stat__label">Silný hero blok s velkou typografií a kontrastem.</div></article>
          <article class="stat glass-card reveal"><div class="stat__num">02</div><div class="stat__label">Karty a layout, které drží estetiku i čitelnost.</div></article>
          <article class="stat glass-card reveal"><div class="stat__num">03</div><div class="stat__label">Snadné rozšíření o další sekce bez buildu.</div></article>
          <article class="stat glass-card reveal"><div class="stat__num">04</div><div class="stat__label">Připravené na GitHub Pages a čisté ES moduly.</div></article>
        </div>
      </section>

      <section class="section shell" id="showcase">
        <div class="section__head">
          <div>
            <div class="eyebrow reveal">Selected work</div>
            <h2 class="section__title reveal">Design system v praxi</h2>
          </div>
          <p class="section__desc reveal">
            Struktura je postavená tak, aby šla rychle upravit pro portfolio, studio,
            produkt nebo osobní web. Vizuální styl je blízko inspiraci, ale zůstává lehký a použitelný.
          </p>
        </div>

        <div class="showcase">
          <article class="glass-card preview reveal">
            <div class="preview__image"></div>
            <div class="preview__meta">
              <span>Focus: typography / spacing / glassmorphism</span>
              <span>Viewport-ready</span>
            </div>
          </article>

          <div class="grid-2">
            <article class="glass-card feature reveal">
              <h3>Hero s důrazem na text</h3>
              <p>Velký nadpis, krátký subtext a dvě CTA tlačítka dávají stránce jasný vstupní bod.</p>
              <div class="chips"><span class="chip">Hero</span><span class="chip">CTA</span><span class="chip">Brand</span></div>
            </article>
            <article class="glass-card feature reveal">
              <h3>Skleněné karty</h3>
              <p>Panelová kompozice přidává hloubku a přitom nechává obsah čitelný na prvním pohledu.</p>
              <div class="chips"><span class="chip">Glass</span><span class="chip">Depth</span><span class="chip">Contrast</span></div>
            </article>
            <article class="glass-card feature reveal">
              <h3>Přirozený motion</h3>
              <p>Revealy a jemné hover efekty jsou lehké, bez build procesu, a přesto působí prémiově.</p>
              <div class="chips"><span class="chip">Reveal</span><span class="chip">Hover</span><span class="chip">Smooth</span></div>
            </article>
            <article class="glass-card feature reveal">
              <h3>Modulární obsah</h3>
              <p>Další sekce můžeš přidat jako nový component soubor bez rozbití celé struktury.</p>
              <div class="chips"><span class="chip">Modules</span><span class="chip">Scalable</span><span class="chip">Static</span></div>
            </article>
          </div>
        </div>
      </section>

      <section class="section shell">
        <div class="section__head">
          <div>
            <div class="eyebrow reveal">Process</div>
            <h2 class="section__title reveal">Jak to drží pohromadě</h2>
          </div>
          <p class="section__desc reveal">
            Cíl je jednoduchý: mít design, který působí luxusně, ale zároveň zůstává přehledný,
            snadno editovatelný a vhodný pro statický hosting.
          </p>
        </div>

        <div class="timeline">
          <article class="glass-card step reveal"><div class="step__num">1</div><div><h3>Silná vizuální hierarchie</h3><p>H1, sekundární text, CTA a karty jsou uspořádané tak, aby první dojem fungoval okamžitě.</p></div></article>
          <article class="glass-card step reveal"><div class="step__num">2</div><div><h3>Minimum chaosu</h3><p>Žádné zbytečné menu elementy ani přeplácané bloky. Všechno má jasnou roli a rytmus.</p></div></article>
          <article class="glass-card step reveal"><div class="step__num">3</div><div><h3>Snadná další rozšíření</h3><p>Stačí přidat nový component a napojit ho do routeru nebo přímo do home view.</p></div></article>
        </div>
      </section>

      <section class="section shell" id="contact">
        <div class="glass-card cta reveal">
          <div>
            <div class="eyebrow">Call to action</div>
            <h2>Chceš z toho udělat ještě víc premium verzi?</h2>
            <p>Další krok může být animované menu, tmavý/light toggle, vlastní sekce služby a portfolio.</p>
          </div>
          <span class="magnetic-wrap">
            <button class="btn btn--primary" data-scroll="#top" type="button">Back to top</button>
          </span>
        </div>
      </section>

      <footer class="footer shell">© 2026 Design Skeleton</footer>
    </main>
  `;
}
