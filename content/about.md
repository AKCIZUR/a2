# O projektu

Tento projekt demonstruje, jak vytvořit moderní webovou aplikaci pouze s nativními technologiemi prohlížeče.

## Proč bez build procesu?

- **Jednoduchost** — Žádná konfigurace, žádné závislosti
- **Rychlost vývoje** — Změny se projeví okamžitě
- **Debugging** — Kód v prohlížeči odpovídá zdrojovému kódu
- **Učení** — Pochopení základů bez abstrakcí

## Kdy použít?

Tento přístup je ideální pro:

- Malé až střední projekty
- Prototypování a MVP
- Dokumentační stránky
- Osobní portfolia
- Výukové projekty

## Core moduly

### Router (`/core/router.js`)

Hash-based router pro SPA navigaci:

```javascript
router
  .on('/', () => renderHome())
  .on('/about', () => renderAbout())
  .on('/user/:id', ({ id }) => renderUser(id))
  .start();
```

### Component (`/core/component.js`)

Jednoduchý reaktivní komponentní systém:

```javascript
class MyComponent extends Component {
  render() {
    return html`<div>${this.state.message}</div>`;
  }
}
```

### Store (`/core/store.js`)

Globální state management s pub/sub:

```javascript
store.set({ user: 'Jan' });
store.subscribe('user', (newVal) => console.log(newVal));
```

## Technologie

- **ES Modules** — Nativní moduly v prohlížeči
- **CSS Custom Properties** — Theming bez preprocessoru
- **Fetch API** — Načítání obsahu
- **Hash Router** — Navigace bez serveru
