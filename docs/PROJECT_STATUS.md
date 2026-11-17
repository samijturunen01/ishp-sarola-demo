# Project status – Itä-Suomen Huoltopalvelu Sarola (Hades Design demo)

_Last updated: 17.11.2026_

## Current phase
Phase 12–13 – deployed to GitHub Pages; final handover.

* Repository: https://github.com/samijturunen01/ishp-sarola-demo
* Live demo: https://samijturunen01.github.io/ishp-sarola-demo/

## Creative concept: "Kipinästä peiliin" (From spark to mirror)
The original nameplate logo already contains the whole story: a glowing orange rim (heat, TIG arc)
around a black → steel → polished-white plate (finish). The site uses that gradient as its
section rhythm, the ellipse as its window/frame shape, and the orange as a thin "welded" accent.

* Typography: Source Serif 4 (display – echoes the logo's bold serif), Albert Sans (body),
  Azeret Mono (engraved technical labels).
* Palette: ink #0b0c0e, steel greys (steel-500 #868d95 is the minimum for small text on dark),
  mirror #eef0f1, arc orange #ff6229 (deep #b23a0e on light backgrounds).
* Texture: brushed-aluminium background from the original theme (`page.jpeg`).

## Completed
- [x] Research and verification → `docs/CONTENT_SOURCES.md`
- [x] Weakness analysis → `docs/REDESIGN_IMPROVEMENTS.md`
- [x] Logo rebuilt as SVG outlines, favicon, OG image; responsive WebP pipeline (EXIF/GPS stripped)
- [x] Layout: header with services dropdown and active "rim" state, full-screen mobile menu,
      footer, mobile call/quote bar, scroll manager (top on navigation, hash, back/forward restore)
- [x] Homepage: nameplate intro, statement, service index with oval cursor preview, pinned
      "Kipinästä peiliin" story, Abloy band, gallery strip, machine spotlight, company band, CTA
- [x] Pages: Palvelut, Abloy (comparison, process, sijaiskone, PDFs, FAQ), CNC (starting-point
      tabs), TIG & kokoonpano (materials, repair sequence), Kiillotus & lasermerkkaus (laser demo),
      Teknos, Tuotteet (grit scale), Galleria (filters + lightbox), Yritys (konekanta table),
      Yhteystiedot (service-aware demo form + click-to-load Google Map), 404
- [x] Prerender of all routes with per-page metadata, LocalBusiness/Service/Breadcrumb JSON-LD,
      sitemap, `noindex` + robots Disallow
- [x] Playwright suite (pages, links, navigation/scroll, intro rules, reduced motion, form demo
      mode, map, gallery, tabs, grit scale, axe WCAG 2.1 AA) – 86 passed, 2 skipped (device-specific)
- [x] Docs: ASSET_PROVENANCE.md, IMAGE_REPLACEMENT_LIST.md, README
- [x] GitHub Actions workflow (lint → build → tests → Pages deploy)

## Known issues / open questions for the customer
- New Oy (3667108-4, registered 29.10.2026) vs. sole-proprietor Y-tunnus 2400653-8 shown on site.
- Opening hours come from a directory listing; second phone number has no owner name.
- Abloy prices (390 € / 497 € alv 0 %) from an undated PDF – confirm.
- "Sento-avainkoneet kotimaisella laadulla" – what exactly is offered?
- EU (Vipuvoimaa / ERDF) logo shown next to Haas VF-2 as on the original – confirm context.

## Local ports used in this workspace
Dev server 5291, test/preview server 4291 (5180 and 4173 are occupied by other projects).

## Next recommended action
Present to the customer; collect answers to the open questions; production steps in README.
