# Redesign improvements – ishp.fi

Analysis of the current site (WordPress theme "sarola", built by Sivututka, ~2013 Artisteer-style
layout) and what the redesign changes – each with its practical business benefit.

## What the business actually is

A multi-skilled industrial workshop in Joensuu (Käpykangas, 400 m², since 2011) with **three
distinct customer groups**:

1. **Locksmiths, hardware stores and key-cutting points** that own Abloy key milling machines
   (6122/6123, AVA 9235/9600 – Classic, Profile, Exec) → service, spare parts, loan machines.
   Also paint retailers with **Teknos tinting machines** (Eastern Finland & Lapland).
2. **Industrial / B2B customers** needing CNC machining, contract manufacturing, series,
   prototypes, repair machining, TIG welding, automation and assembly work.
3. **Private enthusiasts** – motorcycle and car parts, wheels, boat sterndrives: polishing,
   welding repairs, hobby parts, Tuvel sanding strips.

The old site serves none of them specifically. The redesign gives each group its own path.

## Findings and improvements

| # | Weakness on ishp.fi | Improvement in the redesign | Business benefit |
| --- | --- | --- | --- |
| 1 | **First impression**: a page titled "Etusivu" followed by five stacked `<h1>`s and long runs of empty space (`&nbsp;`). No hero, no message hierarchy. | Cinematic hero with the nameplate logo intro, one clear promise ("Yksi soitto, koko verstas.") and two direct CTAs (tarjouspyyntö, soita). | Visitors understand the offer in 5 seconds; phone calls / inquiries become the obvious next step. |
| 2 | **Brand**: the oval nameplate logo is a 228×90 px bitmap on a fixed 770 px header – blurry on modern screens and invisible on mobile. | Logo rebuilt as exact SVG outlines (same ellipse, gradient, serif, counters). Its own story – glowing orange rim + polished plate – becomes the whole visual concept. | The owner recognises the brand instantly, but it now looks premium at every size. |
| 3 | **Service presentation**: services are a bullet list without explanation, imagery or calls to action. | Dedicated pages for Abloy-avainkoneet, CNC-koneistus, TIG-hitsaus & kokoonpano, Kiillotus & lasermerkkaus and Teknos-sävytyskoneet, each composed differently around its real photos and facts. | Each customer group lands on a page written for them – better conversion and search visibility per service. |
| 4 | **Abloy service hidden in a PDF**: the strongest B2B offer (Perushuolto 390 €, Täysihuolto 497 €, service report, test keys, loan machine) is only inside a downloadable price list. | Interactive service comparison (Perushuolto vs. Täysihuolto) on the Abloy page, loan-machine highlight, PDF downloads, and a service-request form with the machine model preselected. | Locksmiths can understand and order service without calling first; makes the company look like the specialist it is. |
| 5 | **Gallery**: 22 excellent high-resolution photos, but shown as small thumbnails with file names as alt text (e.g. "IMG_20240902_124917") and no context. | Filterable gallery (Kiillotus, Vanteet, Koneistus, Hitsaus & korjaus, Laitteet & tilat) with descriptive captions, dates and an accessible fullscreen viewer. Best photos used large throughout the site. | The mirror-polish and repair work sells itself – the photos are the company's strongest proof of quality. |
| 6 | **Machine park** shown as a plain list. | "Konekanta" presented as a technical spec sheet grouped by process (sorvaus, jyrsintä, hionta, hitsaus, viimeistely). | Industrial buyers quickly verify capability (5-axis Haas VF-2, pulse TIG, fiber laser). |
| 7 | **Customer journey**: only a generic contact form (name, email, phone, message). | Service-aware quote form (palvelu, materiaali, kappalemäärä, piirustus/malli olemassa?, toivottu aikataulu) with preselection from each service page, clear validation and demo-mode notice. | Better qualified inquiries → less back-and-forth, faster quotes. |
| 8 | **Mobile**: fixed-width 2013 layout, tiny tap targets, horizontal scrolling. | Mobile-first layouts designed separately: tap-to-call bar, full-screen menu, vertical-oval hero, swipeable gallery. | Most first contacts (e.g. a broken part, a stuck key machine) happen on a phone. |
| 9 | **Trust**: AA credit logo from 2013 (outdated), no Y-tunnus, phone written in two formats, email obfuscated as "info(at)". | Verified Y-tunnus, e-invoicing details, clickable phone/email, real address with interactive map; outdated badge removed (flagged in docs). | Professional B2B credibility; nothing that a buyer could find to be out of date. |
| 10 | **Local SEO**: one meta description, every page title "… – Koneistus Hitsaus Joensuu", empty sitemap structure, alt texts are file names, Universal Analytics tag (shut down 2023). | Unique titles & descriptions, semantic headings, LocalBusiness + Service structured data from verified facts, descriptive URLs (`/palvelut/cnc-koneistus/`), alt texts, sitemap. Demo itself is `noindex`. | Ready to rank for "koneistus Joensuu", "TIG-hitsaus Joensuu", "Abloy avainjyrsinkone huolto", "vanteiden kiillotus Joensuu" once launched. |
| 11 | **Performance / tech**: WordPress 6.8 with emoji scripts, jQuery, Contact Form 7, analytics; 4–6 MB original JPEGs linked directly in the gallery; images with GPS EXIF data published. | Static prerendered React site, responsive WebP (480–2400 px), lazy loading, EXIF/GPS stripped. | Fast on mobile networks; no plugin maintenance; privacy-safe images. |
| 12 | **Accessibility**: heading misuse, no alt texts, low-contrast grey text on brushed-metal background. | WCAG 2.1 AA targets: semantic landmarks, skip link, keyboard-operable menus/gallery/lightbox, visible focus, reduced-motion support. | Usable for everyone, and a legal requirement trend in the EU (EAA 2025). |
| 13 | **Content accuracy**: headline mentions "Sento avainkoneet" with no explanation; mixed "Tig/TIG", "Teknos sävykoneiden/sävytyskone". | Consistent terminology; open questions collected in CONTENT_SOURCES.md for the owner. | A single, consistent professional voice. |
| 14 | **Products**: Tuvel sanding strips mentioned in one sentence, no way to ask for them. | Products page (Tuvel-hiomaliuskat with interactive grit scale P120–P2000, Abloy-varaosat, Sento-avainkoneet) with inquiry CTA. | Turns a hidden product line into a sales opportunity. |

## Signature features chosen for this business

* **Nameplate intro "Hitsaa · kiillota · merkkaa"** – the logo's orange rim is TIG-welded around
  the ellipse, the plate is polished with a light sweep, and the text is fiber-laser marked line by
  line. Three of the company's real processes in ~2.6 seconds; skippable, never blocking.
* **"Kipinästä peiliin" scroll story** – a pinned section where the page background moves through
  the logo's own gradient (black → steel → polished white) while the work moves from sketch to
  machining, welding and mirror finish.
* **Grit scale** – Tuvel strips P120–P2000 visualised as a procedurally drawn abrasive texture that
  gets finer as the user moves along the scale (abstract graphic, not a product photo).
