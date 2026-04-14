# Modulární Static Web

Vítejte v ukázkovém projektu, který demonstruje použití **nativních ES Modules** pro vytvoření moderního statického webu bez build procesu.

## Klíčové vlastnosti

- **Zero Build** — Žádný webpack, vite ani jiný bundler
- **Nativní ES Modules** — Využití import/export přímo v prohlížeči
- **Komponentní systém** — Jednoduchá třída pro reaktivní komponenty
- **Hash Router** — SPA navigace bez serveru
- **State Management** — Pub/Sub store pro sdílený stav

## Jak to funguje?

Prohlížeče dnes podporují ES Modules nativně. Stačí použít `<script type="module">` a můžete používat `import`/`export` přímo bez transpilace.

```javascript
// Nativní import v prohlížeči
import { router } from './core/router.js';
import { Component } from './core/component.js';
```

## Struktura projektu

```
/project
├── index.html
├── /assets
│   ├── /css/styles.css
│   └── /js
│       ├── core/        # Router, Component, Store
│       ├── components/  # Navbar, Footer
│       ├── pages/       # Home, About
│       └── app.js       # Entry point
└── /content             # Markdown obsah
```
