import { Fragment, useEffect, useRef } from 'react'
import { Picture } from '../ui/Picture'
import type { ImageSlug } from '../../data/imageManifest'
import { gsap, prefersReducedMotion, setupGsap } from '../../lib/motion'

type Token = string | { img: ImageSlug; alt: string } // alt kept for documentation; images are decorative inline

const tokens: Token[] = [
  'Koneistamme,',
  'hitsaamme',
  'ja',
  'kiillotamme',
  { img: 'hammaspyorat', alt: 'Koneistettuja hammaspyöriä' },
  'sekä',
  'huollamme',
  'avainjyrsin-',
  'ja',
  'sävytyskoneita',
  { img: 'avainjyrsinkone-huollossa', alt: 'Avainjyrsinkone huollossa' },
  '–',
  '400',
  'neliön',
  'verstaalla',
  'Joensuun',
  'Käpykankaalla.',
  { img: 'verstas-lylykoskentie', alt: 'Verstas Lylykoskentiellä' },
]

/** Editorial statement – words light up as the visitor reads down the page. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    setupGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 45%', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section aria-label="Sarola lyhyesti" className="relative bg-ink py-24 sm:py-32 lg:py-44">
      <div className="shell">
        <p className="label mb-10 flex items-center gap-3 text-arc">
          <span className="h-px w-10 bg-arc" aria-hidden /> Itä-Suomen Huoltopalvelu Sarola
        </p>
        <p ref={ref} className="max-w-[68rem] font-display text-[clamp(1.85rem,4.3vw,4.35rem)] font-[560] leading-[1.08] tracking-[-0.02em] text-white">
          {tokens.map((t, i) =>
            typeof t === 'string' ? (
              <Fragment key={i}>
                <span data-word>{t}</span>{' '}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <span data-word className="relative inline-block h-[0.78em] w-[1.55em] translate-y-[0.08em] align-baseline">
                  <Picture
                    slug={t.img}
                    alt=""
                    sizes="140px"
                    className="oval absolute inset-0 block overflow-hidden rounded-[50%]"
                    placeholder={false}
                    as="span"
                  />
                  <span aria-hidden className="absolute inset-0 rounded-[50%] border-[1.5px] border-arc/80" />
                </span>{' '}
              </Fragment>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
