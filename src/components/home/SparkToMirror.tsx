import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Picture } from '../ui/Picture'
import { SketchGear } from '../art/SketchGear'
import type { ImageSlug } from '../../data/imageManifest'
import { gsap, setupGsap } from '../../lib/motion'

interface Stage {
  n: string
  kicker: string
  title: string
  text: string
  link: { to: string; label: string }
  media: { slug: ImageSlug; alt: string; position?: string } | 'sketch'
  bg: string
  fg: string
  muted: string
  accent: string
}

// Background steps follow the nameplate gradient: black → steel → polished white.
const stages: Stage[] = [
  {
    n: '01',
    kicker: 'Luonnos',
    title: 'Ruutupaperilta.',
    text: 'Lähtötiedoksi käy 3D-malli, mallikappale tai vaikka ruutupaperille piirretty luonnos. Suunnittelemme ja mallinnamme osat Autodesk Fusion 360 -ohjelmistolla.',
    link: { to: '/palvelut/cnc-koneistus', label: 'CNC-koneistus' },
    media: 'sketch',
    bg: '#0b0c0e',
    fg: '#ffffff',
    muted: '#b6bbc1',
    accent: '#ff6229',
  },
  {
    n: '02',
    kicker: 'Koneistus',
    title: 'Sorvilta ja jyrsimeltä.',
    text: 'Koneistamme 3- ja 5-akselisilla CNC-koneilla sekä sorvaamme ja hiomme – yksittäisosista sarjatuotantoon ja harrasteosista prototyyppeihin.',
    link: { to: '/palvelut/cnc-koneistus', label: 'Koneistus ja konekanta' },
    media: { slug: 'hammaspyora-istukassa', alt: 'Teräksinen hammaspyörä kiinnitettynä istukkaan koneistusta varten.' },
    bg: '#24282d',
    fg: '#ffffff',
    muted: '#c3c7cc',
    accent: '#ff8a52',
  },
  {
    n: '03',
    kicker: 'Hitsaus',
    title: 'Siisti jälki, vahva lopputulos.',
    text: 'TIG-hitsaukset alumiinille, rosterille, hapokkaille ja erikoismateriaaleille. Kokoamme myös yksittäiset komponentit ja kokonaiset moduulit valmiiksi toimintaan.',
    link: { to: '/palvelut/tig-hitsaus', label: 'TIG-hitsaus & kokoonpano' },
    media: { slug: 'vetolaite-hitsattu', alt: 'Kaksi perävetolaitteen alaosaa telineissä, evät korjattuina ja hiottuina muotoonsa.', position: '55% 50%' },
    bg: '#8d939b',
    fg: '#0b0c0e',
    muted: '#1a1d21',
    accent: '#0b0c0e',
  },
  {
    n: '04',
    kicker: 'Viimeistely',
    title: 'Peilikirkkaaksi.',
    text: 'Tärykiillotus, vanteiden ja moottorin osien kiillotus sekä pysyvät merkinnät fiber-laserilla viimeistelevät työn.',
    link: { to: '/palvelut/kiillotus-ja-lasermerkkaus', label: 'Kiillotus & lasermerkkaus' },
    media: { slug: 'moottorin-kansi-kiillotettu', alt: 'Kiillotettu alumiininen moottorin kansi heijastaa verstaan valoja.' },
    bg: '#eef0f1',
    fg: '#0b0c0e',
    muted: '#2f343a',
    accent: '#b23a0e',
  },
]

function StageMedia({ stage, sizes }: { stage: Stage; sizes: string }) {
  if (stage.media === 'sketch') return <SketchGear className="h-full w-full object-cover" />
  return (
    <Picture
      slug={stage.media.slug}
      alt={stage.media.alt}
      sizes={sizes}
      className="h-full w-full"
      imgClassName="h-full w-full object-cover"
      position={stage.media.position}
    />
  )
}

export function SparkToMirror() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setupGsap()
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const el = root.current!
      const pin = el.querySelector<HTMLElement>('[data-s2m-pin]')!
      const texts = gsap.utils.toArray<HTMLElement>('[data-s2m-text]', el)
      const media = gsap.utils.toArray<HTMLElement>('[data-s2m-media]', el)
      const strokes = gsap.utils.toArray<SVGGeometryElement>('[data-s2m-media] [data-draw]', el)
      const progress = el.querySelector<SVGEllipseElement>('[data-s2m-progress]')

      strokes.forEach((s) => {
        const len = s.getTotalLength()
        gsap.set(s, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.set(texts.slice(1), { opacity: 0, y: 50 })
      gsap.set(media.slice(1), { opacity: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
        // Driven by the (smoothed) timeline time, so the indicator never lags the visuals.
        onUpdate: () => setActive(Math.min(stages.length - 1, Math.floor(tl.time() + 0.1))),
      })
      tl.to(strokes, { strokeDashoffset: 0, duration: 0.7, stagger: 0.05, ease: 'none' }, 0)
      if (progress) tl.fromTo(progress, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 3.6, ease: 'none' }, 0)

      for (let i = 1; i < stages.length; i++) {
        const at = i
        const s = stages[i]
        tl.to(texts[i - 1], { opacity: 0, y: -50, duration: 0.35 }, at - 0.15)
          .to(texts[i], { opacity: 1, y: 0, duration: 0.4 }, at + 0.1)
          .to(media[i], { opacity: 1, duration: 0.45 }, at - 0.15)
          .fromTo(media[i].firstElementChild, { scale: 1.18 }, { scale: 1, duration: 0.9, ease: 'power1.out' }, at - 0.15)
          .to(
            pin,
            { backgroundColor: s.bg, '--s2m-fg': s.fg, '--s2m-muted': s.muted, '--s2m-accent': s.accent, duration: 0.55 },
            at - 0.2,
          )
      }
      tl.to({}, { duration: 0.6 })
    })
    return () => mm.revert()
  }, [])

  const s0 = stages[0]
  return (
    <section ref={root} aria-label="Kipinästä peiliin – näin työ etenee" className="relative">
      {/* Desktop: pinned, scroll-driven */}
      <div className="s2m-desktop hidden lg:block">
        <div
          data-s2m-pin
          className="relative h-[100svh] overflow-hidden"
          style={
            {
              backgroundColor: s0.bg,
              '--s2m-fg': s0.fg,
              '--s2m-muted': s0.muted,
              '--s2m-accent': s0.accent,
            } as CSSProperties
          }
        >
          <div className="shell grid h-full grid-cols-12 items-center gap-10 pt-16">
            <div className="col-span-5">
              <p className="label flex items-center gap-3 text-[color:var(--s2m-accent)]">
                <span className="h-px w-10 bg-current" aria-hidden /> Kipinästä peiliin
              </p>
              <div className="relative mt-10 h-[23rem] xl:h-[25rem]">
                {stages.map((s, i) => (
                  <article key={s.n} data-s2m-text className="absolute inset-0" aria-hidden={active !== i}>
                    <p className="label text-[color:var(--s2m-accent)]">
                      {s.n} · {s.kicker}
                    </p>
                    <h2 className="display-lg mt-5 text-[color:var(--s2m-fg)]">{s.title}</h2>
                    <p className="lead mt-6 max-w-[30rem] text-[color:var(--s2m-muted)]">{s.text}</p>
                    <Link
                      to={s.link.to}
                      tabIndex={active === i ? 0 : -1}
                      className="link-weld mt-7 inline-block font-semibold text-[color:var(--s2m-fg)]"
                    >
                      {s.link.label}
                    </Link>
                  </article>
                ))}
              </div>
              <ol className="mt-8 flex gap-6" aria-label="Vaiheet">
                {stages.map((s, i) => (
                  <li
                    key={s.n}
                    className={`label flex items-center gap-2 transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-45'} text-[color:var(--s2m-fg)]`}
                  >
                    <span
                      aria-hidden
                      className={`inline-block h-[9px] w-[15px] rounded-[50%] border-[1.5px] border-current ${active === i ? 'bg-[color:var(--s2m-accent)]' : ''}`}
                    />
                    {s.kicker}
                  </li>
                ))}
              </ol>
            </div>

            <div className="col-span-7">
              <div className="relative mx-auto aspect-[5/4] w-full max-w-[46rem]">
                {stages.map((s) => (
                  <div key={s.n} data-s2m-media className="oval absolute inset-0 overflow-hidden">
                    <div className="h-full w-full">
                      <StageMedia stage={s} sizes="(min-width: 1024px) 55vw, 100vw" />
                    </div>
                  </div>
                ))}
                <svg aria-hidden className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] overflow-visible">
                  <ellipse cx="50%" cy="50%" rx="49.4%" ry="49.4%" fill="none" stroke="currentColor" strokeWidth="1" className="text-[color:var(--s2m-fg)] opacity-20" />
                  <ellipse
                    data-s2m-progress
                    cx="50%"
                    cy="50%"
                    rx="49.4%"
                    ry="49.4%"
                    fill="none"
                    stroke="#ff6229"
                    strokeWidth="2"
                    pathLength={1}
                    strokeDasharray="1 1"
                    strokeDashoffset="1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile, tablet and reduced motion: stacked chapters on the plate gradient */}
      <div
        className="s2m-stacked py-24 lg:hidden"
        style={{ background: 'linear-gradient(180deg,#0b0c0e 0%,#24282d 30%,#7b8189 58%,#d5d8dc 80%,#eef0f1 100%)' }}
      >
        <div className="shell">
          <p className="label flex items-center gap-3 text-arc">
            <span className="h-px w-10 bg-current" aria-hidden /> Kipinästä peiliin
          </p>
          <ol className="mt-12 space-y-20">
            {stages.map((s) => (
              <li key={s.n} className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="oval aspect-[5/4] overflow-hidden" data-reveal="oval">
                  <StageMedia stage={s} sizes="(min-width: 768px) 50vw, 92vw" />
                </div>
                <div style={{ color: s.fg }}>
                  <p className="label" style={{ color: s.accent }}>
                    {s.n} · {s.kicker}
                  </p>
                  <h2 className="display-md mt-4">{s.title}</h2>
                  <p className="mt-4 text-[1.05rem] leading-relaxed" style={{ color: s.muted }}>
                    {s.text}
                  </p>
                  <Link to={s.link.to} className="link-weld mt-5 inline-block font-semibold">
                    {s.link.label}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
