# Asset provenance

All photographs, the logo and the documents come from the company's own website **ishp.fi**
(downloaded 17.11.2026). The customer has confirmed permission to use and publish the company's
logo, branding materials and company photographs in this demo.

Processing: `scripts/prepare-assets.mjs` – auto-rotation, **EXIF metadata removed (several phone
photos contained GPS coordinates)**, responsive WebP 480/800/1200/1800/2400 px. Originals are kept
locally in `source-assets/` (git-ignored).

## Logo and brand

| Local file | Source URL | Description | Use | Rights |
| --- | --- | --- | --- | --- |
| `public/brand/ishp-logo.svg`, `src/components/brand/logoPaths.ts` | https://ishp.fi/wp-content/themes/sarola/images/object2028756370.png | Oval nameplate logo rebuilt as vector outlines (Tinos Bold, Apache-2.0, metrically compatible with Times Bold), same ellipse, gradient and orange | Header, footer, intro animation, OG image | Company logo – authorised |
| `public/brand/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png` | derived from the logo | Mini nameplate with the logo's "S" | Favicons | Derived from authorised logo |
| `public/images/harjattu-metalli.webp` | https://ishp.fi/wp-content/themes/sarola/images/page.jpeg | Brushed-aluminium texture of the original theme | Background texture | Part of company's current site theme (made by Sivututka) – ⚠ confirm the texture is not a licensed stock asset of the theme vendor; trivial to replace with CSS noise |
| `public/images/vipuvoimaa-eu.webp` | https://ishp.fi/wp-content/uploads/vipuvoimaa.png | "Vipuvoimaa EU:lta 2014–2020" / ERDF logo | Yritys page, next to Haas VF-2 (as on original homepage) | EU funding publicity logo – used as on the original site |
| `public/images/og-sarola.jpg` | composite of logo + `IMG_20241010_160054.jpg` | Open Graph image 1200×630 | Link previews | Authorised assets |

## Photographs (company gallery, homepage)

| Local slug (`public/images/<slug>-<w>.webp`) | Source URL | Description | Used on |
| --- | --- | --- | --- |
| ristikkovanne-kiillotettu | https://ishp.fi/wp-content/gallery/kuvagalleria/IMG_20241010_160054.jpg | Polished mesh wheel | Home hero, finishing page, gallery, OG |
| ristikkovanne-tyon-alla | …/kuvagalleria/IMG_20241007_105712.jpg | Mesh wheel during polishing | Finishing, gallery strip, gallery |
| vanteet-kiillotettu | …/kuvagalleria/IMG_20240812_182233.jpg | Four polished wheels | Finishing hero, home, gallery |
| vanne-mattamusta | …/kuvagalleria/IMG_20240729_084109.jpg | Matte black wheel | Gallery |
| vanne-klassikko-kiillotettu | …/kuvagalleria/IMG_20240927_084100.jpg | Polished classic wheel | Finishing, home, gallery |
| moottorin-kansi-kiillotettu | https://ishp.fi/wp-content/gallery/gallery-2/IMG_20231113_130152.jpg | Polished engine cover | Home story, gallery |
| moottorin-kotelo-kiillotettu | …/kuvagalleria/20241126_102634.jpg | Polished engine case halves | Finishing, home, gallery |
| kiillotetut-osat | …/kuvagalleria/20241205_123616.jpg | Polished covers and small parts | Finishing, home, gallery |
| rivoitetut-kannet-kiillotettu | …/kuvagalleria/20241205_123623.jpg | Two finned covers polished | Finishing, home, gallery |
| alumiinikappaleet-peili | …/kuvagalleria/IMG_20240927_145112.jpg | Mirror-polished aluminium blocks | CNC, finishing, home, gallery |
| hammaspyora-istukassa | …/kuvagalleria/1_IMG_20221115_120528.jpg | Gear in a chuck | Home story, CNC, gallery |
| hammaspyorat | …/kuvagalleria/IMG_20221116_071719.jpg | Five machined gears | CNC, home statement, gallery |
| avainjyrsinkone-huollossa | …/kuvagalleria/IMG_20220907_171001.jpg | Key milling machine disassembled for service (identified from parts matching the Abloy spare-parts list) | Abloy page, home, products, gallery |
| vetolaite-vaurio | …/kuvagalleria/IMG_20240902_124917.jpg | Sterndrive lower unit with damaged skeg | Welding sequence, gallery |
| vetolaite-hitsattu | …/kuvagalleria/IMG_20240902_145846.jpg | Skegs repaired and shaped | Home story, welding, gallery |
| vetolaite-pohjamaali | …/kuvagalleria/IMG_20240902_182653.jpg | Units in primer | Welding sequence, gallery |
| vetolaite-maalaus | …/kuvagalleria/IMG_20240903_180215.jpg | Units painted grey | Welding sequence, gallery |
| vetolaite-valmis | …/kuvagalleria/IMG_20240917_171314.jpg | Glossy black unit | Welding sequence, gallery |
| vetolaitteet-valmiit | …/kuvagalleria/IMG_20240927_085806.jpg | Finished black and silver units | Welding hero, services, gallery |
| vetolaite-musta | …/kuvagalleria/IMG_20240814_083334.jpg | Black unit close-up | Gallery |
| vetolaite-harmaa | …/kuvagalleria/IMG_20240814_083406.jpg | Grey unit | Gallery |
| lasermerkkauskone | https://ishp.fi/wp-content/gallery/gallery-2/IMG_20210416_115329.jpg | Fiber laser marking machine | Finishing page, gallery |
| haas-vf2 | https://ishp.fi/wp-content/uploads/IMG_20211216_174053.jpg | Haas VF-2YT machining centre | CNC hero, home, company, services |
| verstas-lylykoskentie | https://ishp.fi/wp-content/uploads/IMG_20200912_130237.jpg | Workshop building, Lylykoskentie 31 | Company hero, home, gallery |

Photo dates shown in captions come from the camera timestamps in the original file names.

## Documents

| Local file | Source URL | Use |
| --- | --- | --- |
| `public/docs/Abloy-Varaosaluettelo.pdf` | https://ishp.fi/wp-content/uploads/Abloy-Varaosaluettelo.pdf | Download on Abloy & products pages (company's own price list) |
| `public/docs/Manuaali.pdf` | https://ishp.fi/wp-content/uploads/Manuaali.pdf | Download on Abloy page – ⚠ confirm the manual may be redistributed (may be manufacturer material) |

## Not used

* `aa_logo.png` – "AA Hyvä luottokelpoisuus, Soliditet 2013" (outdated, see CONTENT_SOURCES.md)
* `yhteydenotto.jpg` – generic stock rotary-phone image
* `yritys2.jpg` – 200×200 px photo of a person at a CNC control; too small and the person is not named

## Illustrations created for the demo (clearly not photographs)

`SketchGear` (grid-paper gear sketch), `Wireframe` (isometric CAD-style block), `TintRing`
(abstract colorant carousel), material swatches with a stylised TIG bead, the laser-marking demo
and the grit-scale texture. All are labelled as illustrations ("havainnekuva") where they could be
mistaken for real objects.

## Fonts (all SIL OFL / Apache, self-hosted via Fontsource)

Source Serif 4, Albert Sans, Azeret Mono; Tinos (build-time only, for logo outlines).
