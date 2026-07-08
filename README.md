# Linktree — @diegosandie

Página de enlaces estática (linktree) para Instagram, construida sobre el
**sistema de diseño DSD** (asfalto + grava, Archivo + JetBrains Mono, un solo
acento). Pensada para alojarse gratis en **GitHub Pages**.

**URL de destino:** https://parra28.github.io/linktree/

## Cómo editar el contenido

Todo el contenido vive en [`links.json`](links.json). No hace falta tocar
HTML ni CSS.

```jsonc
{
  "profile": {
    "handle": "@diegosandie",
    "name": "DIEGO SÁNCHEZ",
    "bio": "Una línea de bio, sin exclamaciones.",
    "accent": "#FF7A1A"          // uno de los 6 swatches curados DSD
  },
  "links": [
    {
      "tag": "NEWSLETTER",       // kicker mono en mayúsculas
      "title": "Texto del botón",
      "subtitle": "Descripción corta (opcional)",
      "url": "https://...",
      "cta": true                // opcional: lo convierte en botón píldora de acento
    }
  ],
  "socials": [
    { "label": "Instagram", "url": "https://instagram.com/diegosandie" },
    { "label": "Email", "url": "mailto:diegosanchezdie@gmail.com" }
  ]
}
```

### Cambiar el acento
Edita `profile.accent` con uno de los swatches curados:

| Nombre | Hex |
|---|---|
| Naranja KOM (default) | `#FF7A1A` |
| Maillot | `#FFB600` |
| Sol | `#FFD84D` |
| Terracota | `#E2603C` |
| Oro viejo | `#C9A227` |
| Celeste | `#57C0A6` |

## Ver en local

Necesita un servidor (el `fetch` de `links.json` no funciona con `file://`):

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicar en GitHub Pages

1. Sube los cambios: `git add -A && git commit -m "Linktree DSD" && git push`
2. En GitHub: **Settings → Pages**.
3. En *Build and deployment* → *Source*: **Deploy from a branch**.
4. Branch: **`master`**, carpeta **`/ (root)`** → **Save**.
5. Espera ~1 min. Estará en `https://parra28.github.io/linktree/`.

Pon esa URL en tu bio de Instagram.

## Pendiente / mejoras opcionales

- `assets/logo-white-transparent.png`: sustituir el SVG del monograma por tu logo real.
- `assets/og-image.png`: imagen 1200×630 para la previsualización al compartir el enlace.
- Analítica de clicks (GoatCounter / Plausible) si más adelante quieres medir.
- Dominio propio (ej. `links.diegosandie.com`) con un archivo `CNAME`.

## Estructura

```
index.html          Estructura de la página
links.json          ← contenido editable (enlaces, perfil, redes)
assets/
  styles.css        Tokens y estilos del sistema DSD
  app.js            Carga links.json y construye la página
  favicon.svg       Monograma DSD
```
