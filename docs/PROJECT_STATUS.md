# Project status – Itä-Suomen Huoltopalvelu Sarola (Hades Design demo)

_Last updated: 18.11.2026_

## Current phase
Phase 13 – deployed to GitHub Pages; final handover. Feature-complete; only customer answers
(see open questions) and production integration remain.

* Target company: Itä-Suomen Huoltopalvelu Sarola, Lylykoskentie 31, 80130 Joensuu
* Original website: https://ishp.fi/
* Repository: https://github.com/samijturunen01/ishp-sarola-demo (public)
* Live demo: https://samijturunen01.github.io/ishp-sarola-demo/
* Deployment: GitHub Actions on every push to `main` (lint → build → Playwright → Pages)

## Project-specific requirements (override the generic master prompt)
* Master prompt: `C:\VERKKOSIVUT\Prompt.md` – its example URL is **not** this project; never edit it.
* Publication of the company's logo, branding and company photos is authorised by the user
  (master prompt §8); all published assets are listed in `docs/ASSET_PROVENANCE.md`.
* Demo stays `noindex` + robots `Disallow`; the inquiry form stays in demo mode (`VITE_FORM_MODE=demo`).
* Do not touch ishp.fi, its hosting, DNS or email.
* Fonts must stay distinct from the user's other demos (see sibling folders in `C:\VERKKOSIVUT`).

## Creative concept: "Kipinästä peiliin" (From spark to mirror)
The original nameplate logo already contains the whole story: a glowing orange rim (heat, TIG arc)
around a black → steel → polished-white plate (finish). The site uses that gradient as its
section rhythm, the ellipse as its window/frame shape, and the orange as a thin "welded" accent.

* Typography: Source Serif 4 (display – echoes the logo's bold serif), Albert Sans (body),
  Azeret Mono (engraved technical labels).
* Palette: ink #0b0c0e, steel greys (steel-500 #868d95 is the minimum for small text on dark),
  mirror #eef0f1, arc orange #ff6229 (deep #b23a0e on light backgrounds).
* Texture: brushed-aluminium background from the original theme (`page.jpeg`).
* Abstract SVG art (sketch gear, wireframe, tint ring, key profile) is always captioned or
  obviously illustrative – never presented as a product photo.

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
      Teknos, Tuotteet (grit scale, key-profile art), Galleria (filters + lightbox), Yritys
      (konekanta table), Yhteystiedot (service-aware demo form + click-to-load Google Map), 404
- [x] Prerender of all routes with per-page metadata, LocalBusiness/Service/Breadcrumb JSON-LD,
      sitemap, `noindex` + robots Disallow
- [x] Playwright suite (pages, links, navigation/scroll, intro rules, reduced motion, form demo
      mode, map, gallery, tabs, grit scale, axe WCAG 2.1 AA)
- [x] Docs: ASSET_PROVENANCE.md, IMAGE_REPLACEMENT_LIST.md, README
- [x] GitHub Actions workflow (lint → build → tests → Pages deploy)

### 18.11.2026 refinement session
- Mobile hero: horizontal oval window (echoes the nameplate) + tighter spacing, so the headline and
  both CTAs fit on the first screen of a 390 × 844 phone (CTA was previously below the fold).
- Tuotteet → Sento block: was an empty outlined box; now a two-column composition with
  `KeyProfile.tsx` – a key whose bow is the logo plate; a cutter traces the bitting on scroll
  (static under reduced motion, tick labels hidden below `sm`).
- Full visual QA at 1440 / 820 / 390 of every route: no horizontal overflow, no console errors
  (only the intentional 404 on the 404 test route).

## Testing status (18.11.2026, local production build)
* `npm run lint` ✔ · `npm run typecheck` ✔ · `npm run build` ✔ (12 routes prerendered)
* `npm test` – 86 passed, 2 skipped (device-specific: mobile-menu Escape test runs on mobile only, services-dropdown
  keyboard test on desktop only)
* Performance (Playwright + CDP, Pixel 7, 4× CPU, ~1.6 Mbit/s, 150 ms RTT; local server without gzip):
  subpages FCP/LCP 1.0–1.25 s, CLS 0 on every measured page. Homepage FCP 1.4 s, LCP ≈ 3.0 s –
  the hero photo is the LCP element and is revealed by the intro (accepted trade-off of the
  mandatory signature intro; the page is interactive and skippable immediately).
  Homepage HTML 163 kB raw / 31 kB gzip (logo outlines are inlined in header, intro, menu, footer).

## Known issues / open questions for the customer
- New Oy (3667108-4, registered 29.10.2026) vs. sole-proprietor Y-tunnus 2400653-8 shown on site.
- Opening hours come from a directory listing; second phone number has no owner name.
- Abloy prices (390 € / 497 € alv 0 %) from an undated PDF – confirm.
- "Sento-avainkoneet kotimaisella laadulla" – what exactly is offered?
- EU (Vipuvoimaa / ERDF) logo shown next to Haas VF-2 as on the original – confirm context.

## Remaining tasks
None for the demo. Production work (after purchase) is listed in README → Configuration and in the
final handover: content approval, domain/DNS, HTTPS check, Apps Script + reCAPTCHA (server-side
verification), privacy notice, `VITE_ALLOW_INDEXING=true`, `VITE_BASE_PATH=/`.

## Local ports used in this workspace
Dev server 5291, test/preview server 4291 (5180 and 4173 are occupied by other projects).

## Next recommended action
Present to the customer; collect answers to the open questions; then apply production steps.
