# Project status – Itä-Suomen Huoltopalvelu Sarola (Hades Design demo)

_Last updated: 17.11.2026_

## Current phase
Phase 6 – supporting pages (homepage complete and visually reviewed on desktop + mobile).

## Creative concept: "Kipinästä peiliin" (From spark to mirror)
The original nameplate logo already contains the whole story: a glowing orange rim (heat, TIG arc)
around a black → steel → polished-white plate (finish). The site uses that gradient as its
section rhythm, the ellipse as its window/frame shape, and the orange as a thin "welded" accent.

* Typography: Source Serif 4 (display – echoes the logo's bold serif), Albert Sans (body),
  Azeret Mono (engraved technical labels).
* Palette: ink #0b0c0e, steel greys, mirror #eef0f1, arc orange #ff6229 (deep #b23a0e on light).
* Texture: authentic brushed-aluminium background from the original theme (`page.jpeg`).

## Completed
- [x] Research, asset download, PRH / directory verification → `docs/CONTENT_SOURCES.md`
- [x] Weakness analysis → `docs/REDESIGN_IMPROVEMENTS.md`
- [x] Logo rebuilt as SVG outlines (`scripts/build-logo.mjs`), favicon, OG image
- [x] Responsive WebP pipeline with EXIF/GPS stripping (`scripts/prepare-assets.mjs`)
- [x] Layout: header (dropdown, active oval), full-screen mobile menu with focus trap, footer,
      mobile action bar, scroll manager (top on navigation, hash, back/forward restore)
- [x] Homepage: nameplate intro (weld → polish → laser-mark → window), statement, service index
      with oval cursor preview, pinned "Kipinästä peiliin" story, Abloy band with key-tag prices,
      gallery strip, machine spotlight, company band, contact CTA

## Remaining
- [ ] Pages: Palvelut, 5 service pages, Tuotteet, Galleria (+ lightbox), Yritys, Yhteystiedot (form + map), 404
- [ ] Prerender script, serve-dist, GitHub Actions workflow
- [ ] Playwright tests + axe checks
- [ ] Docs: ASSET_PROVENANCE.md, IMAGE_REPLACEMENT_LIST.md
- [ ] Deployment to GitHub Pages (`samijturunen01/ishp-sarola-demo`) and live verification

## Known issues / decisions
- Intro plays on every full load of `/` (no storage), not after in-app navigation; skippable by any input.
- Opening hours come from a directory listing (flagged for confirmation).

## Next recommended action
Build the supporting pages, then prerender + tests + deploy.
