import { useMemo, useState } from 'react'
import { Expand } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { Lightbox } from '../components/ui/Lightbox'
import { ContactCta } from '../components/ui/ContactCta'
import { gallery, galleryCategories, type GalleryCategory } from '../data/gallery'
import { IMAGE_MANIFEST } from '../data/imageManifest'

export function Gallery() {
  const [cat, setCat] = useState<GalleryCategory | 'kaikki'>('kaikki')
  const [open, setOpen] = useState<number | null>(null)
  const items = useMemo(() => (cat === 'kaikki' ? gallery : gallery.filter((g) => g.category === cat)), [cat])
  const count = (id: GalleryCategory | 'kaikki') => (id === 'kaikki' ? gallery.length : gallery.filter((g) => g.category === id).length)

  return (
    <>
      <PageHero
        variant="type"
        crumbs={[{ to: '/galleria', label: 'Galleria' }]}
        kicker="Galleria"
        title={
          <>
            Suoraan <span className="text-mirror italic [--sheen:55]">verstaalta.</span>
          </>
        }
        lead={`${gallery.length} kuvaa Sarolan työstä – kiillotettuja vanteita ja moottorin osia, koneistettuja kappaleita, vetolaitteiden korjauksia ja huoltoja. Ei kuvapankkikuvia.`}
      />

      <section aria-label="Kuvat" className="bg-ink pb-24 sm:pb-32">
        <div className="shell">
          <div className="sticky top-[4.5rem] z-20 -mx-4 bg-ink/90 px-4 py-4 backdrop-blur-md lg:top-[5.25rem]">
            <div role="group" aria-label="Suodata kuvia" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
              {galleryCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-full border px-5 text-[0.95rem] font-semibold transition-colors ${
                    cat === c.id ? 'border-arc bg-arc text-ink' : 'border-white/15 text-steel-300 hover:text-white'
                  }`}
                >
                  {c.label}
                  <span className={`font-mono text-xs ${cat === c.id ? 'text-ink' : 'text-steel-400'}`}>{count(c.id)}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            Näytetään {items.length} kuvaa.
          </p>

          <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((g, i) => {
              const m = IMAGE_MANIFEST[g.slug]
              return (
                <li key={g.slug} className="mb-5 break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group block w-full text-left"
                    data-gallery-item
                  >
                    <span className="relative block overflow-hidden rounded-[1.8rem] bg-ink-3" style={{ aspectRatio: `${m.w} / ${m.h}` }}>
                      <Picture
                        as="span"
                        slug={g.slug}
                        alt={g.alt}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                        className="block h-full w-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                      <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Expand size={18} aria-hidden />
                        <span className="sr-only">Avaa suurempana</span>
                      </span>
                    </span>
                    <span className="mt-3 flex items-baseline justify-between gap-4 px-1">
                      <span className="text-steel-200">{g.title}</span>
                      <span className="label text-[0.62rem] text-steel-500">{g.date}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <Lightbox items={items} index={open} onChange={setOpen} />
      <ContactCta title="Samanlaista työtä mielessä?" />
    </>
  )
}
