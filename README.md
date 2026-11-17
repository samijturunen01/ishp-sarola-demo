# Itä-Suomen Huoltopalvelu Sarola – website redesign demo

Speculative redesign by **Hades Design** for Itä-Suomen Huoltopalvelu Sarola (Joensuu).
Not the company's official website – the demo is published with `noindex`.

* Live demo: https://samijturunen01.github.io/ishp-sarola-demo/
* Original site: https://ishp.fi/

## Concept – "Kipinästä peiliin" (From spark to mirror)

The company's oval nameplate logo has a glowing orange rim around a black → steel → polished-white
plate. The site turns that into its design language: the ellipse is the window shape for imagery,
the plate gradient drives the section rhythm, and orange is used as a thin "welded" accent.

Signature moments:

* **Homepage intro "Hitsaa · kiillota · merkkaa"** – a TIG torch welds the logo's rim, a polishing
  pass turns the raw plate into the logo gradient, a fiber-laser beam marks the text, and the plate
  opens into the hero window. Plays on every full load of the homepage (not on in-app navigation),
  skippable by any input, disabled for `prefers-reduced-motion`.
* **"Kipinästä peiliin" scroll story** – pinned section whose background follows the logo gradient
  while the work moves from sketch → machining → welding → mirror finish.
* Abloy service comparison, CNC starting-point tabs, laser-marking demo, Tuvel grit scale,
  filterable gallery with lightbox, service-aware inquiry form (demo mode), click-to-load map.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · React Router 7 · GSAP + ScrollTrigger · Lucide.
Every route is prerendered to static HTML (`scripts/prerender.mjs`) with its own metadata and
structured data, so deep links and refreshes work on GitHub Pages.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5173/ishp-sarola-demo/
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run build        # type check + Vite build + prerender + sitemap/robots
npm run preview      # serve dist/ like GitHub Pages (port 4291)
npx playwright install chromium
npm test             # Playwright: pages, navigation, intro, form, map, gallery, axe a11y
npm run assets       # rebuild logo SVG + optimise photos (needs source-assets/)
```

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_BASE_PATH` | `/ishp-sarola-demo/` | Base path (use `/` on the customer's own domain) |
| `SITE_URL` | GitHub Pages URL | Canonical / OG / sitemap URLs |
| `VITE_ALLOW_INDEXING` | `false` | `true` only for the approved production site |
| `VITE_FORM_MODE` | `demo` | `live` enables the Apps Script adapter |
| `VITE_FORM_ENDPOINT` | – | Google Apps Script web-app URL (production) |
| `VITE_RECAPTCHA_SITE_KEY` | – | Public reCAPTCHA key; the secret stays server-side |

## Documentation

* `docs/CONTENT_SOURCES.md` – where every fact comes from, open questions
* `docs/REDESIGN_IMPROVEMENTS.md` – weaknesses of the old site and what was improved
* `docs/ASSET_PROVENANCE.md` – source of every image/document
* `docs/IMAGE_REPLACEMENT_LIST.md` – optional photos that would improve production
* `docs/PROJECT_STATUS.md` – progress and next steps
