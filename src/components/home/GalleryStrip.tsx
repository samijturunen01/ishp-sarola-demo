import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Picture } from '../ui/Picture'
import { galleryBySlug } from '../../data/gallery'
import type { ImageSlug } from '../../data/imageManifest'
import { gsap, setupGsap } from '../../lib/motion'

type Tile = { slug: ImageSlug; tall?: boolean }
const rowA: Tile[] = [
  { slug: 'vanteet-kiillotettu' },
  { slug: 'rivoitetut-kannet-kiillotettu', tall: true },
  { slug: 'alumiinikappaleet-peili' },
  { slug: 'vanne-klassikko-kiillotettu', tall: true },
]
const rowB: Tile[] = [
  { slug: 'moottorin-kotelo-kiillotettu', tall: true },
  { slug: 'ristikkovanne-tyon-alla' },
  { slug: 'kiillotetut-osat', tall: true },
  { slug: 'vetolaitteet-valmiit' },
]

function Item({ slug, tall }: Tile) {
  const g = galleryBySlug(slug)
  return (
    <figure className={`group relative shrink-0 snap-start ${tall ? 'w-[17rem] md:w-[19rem]' : 'w-[78vw] md:w-[32rem]'} max-w-[78vw]`}>
      <div className={`overflow-hidden rounded-[2rem] bg-ink-3 ${tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
        <Picture
          slug={slug}
          alt={g?.alt ?? ''}
          sizes="(min-width: 768px) 32rem, 78vw"
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm text-steel-400">
        <span className="text-steel-200">{g?.title}</span>
        <span className="label text-[0.62rem] text-steel-500">{g?.date}</span>
      </figcaption>
    </figure>
  )
}

/** "Peilikirkas" – the polishing work in two drifting rows (scroll-linked, never autoplaying). */
export function GalleryStrip() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    setupGsap()
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      gsap.fromTo('[data-row="a"]', { xPercent: 2 }, { xPercent: -14, ease: 'none', scrollTrigger: st })
      gsap.fromTo('[data-row="b"]', { xPercent: -18 }, { xPercent: -4, ease: 'none', scrollTrigger: st })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="peilikirkas-otsikko" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="shell flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="label text-arc" data-reveal>
            Galleria
          </p>
          <h2 id="peilikirkas-otsikko" className="display-xl text-mirror mt-4 [--sheen:30]" data-reveal>
            Peilikirkas.
          </h2>
        </div>
        <div className="max-w-sm" data-reveal data-delay="0.1">
          <p className="text-steel-300">
            Vanteita, moottorin kansia ja koneistettuja kappaleita – suoraan Sarolan verstaalta, ei kuvapankista.
          </p>
          <Link to="/galleria" className="link-weld mt-5 inline-flex items-center gap-2 font-semibold text-white">
            Avaa galleria <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="mt-16 space-y-6 md:space-y-8">
        <div
          data-row="a"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:snap-none md:gap-6 md:overflow-visible md:px-[6vw] md:pb-0"
        >
          {rowA.map((r) => (
            <Item key={r.slug} {...r} />
          ))}
        </div>
        <div
          data-row="b"
          className="hidden gap-6 md:flex md:px-[6vw]"
        >
          {rowB.map((r) => (
            <Item key={r.slug} {...r} />
          ))}
        </div>
      </div>
    </section>
  )
}
