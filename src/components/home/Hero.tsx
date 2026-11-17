import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { Picture } from '../ui/Picture'
import { IntroPlate } from '../brand/IntroPlate'
import { LOGO_ELLIPSE, LOGO_LINES, LOGO_VIEWBOX } from '../brand/logoPaths'
import { company } from '../../data/company'
import { machineCount } from '../../data/machines'
import { introState, releaseIntroHold } from '../../lib/intro'
import { gsap, prefersReducedMotion, ScrollTrigger, setupGsap } from '../../lib/motion'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const FINAL_R = 49.6 // final window ellipse radius in % of the frame

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const plateWrap = useRef<HTMLDivElement>(null)
  const plate = useRef<SVGSVGElement>(null)
  const [ring, setRing] = useState<{ w: number; h: number } | null>(null)

  // ---------- Signature intro: weld → polish → laser-mark → open the window ----------
  useIsoLayoutEffect(() => {
    const shouldPlay = !introState.played && !introState.navigated && !prefersReducedMotion()
    if (!shouldPlay) {
      releaseIntroHold()
      return
    }
    introState.played = true
    setupGsap()

    const q = <T extends Element>(sel: string) => Array.from(plate.current!.querySelectorAll<T>(`[data-part="${sel}"]`))
    const part = <T extends Element>(sel: string) => q<T>(sel)[0]
    const hideEls = Array.from(root.current!.querySelectorAll<HTMLElement>('[data-intro="hide"]'))
    const lines = Array.from(root.current!.querySelectorAll<HTMLElement>('[data-hero-line]'))
    const photo = root.current!.querySelector<HTMLElement>('[data-hero-photo]')!
    const photoImg = photo.querySelector('img')
    const rimSvg = root.current!.querySelector<SVGSVGElement>('[data-hero-rim]')!
    const rimEllipse = rimSvg.querySelector('ellipse')!
    const copyEls = hideEls.filter((el) => !el.hasAttribute('data-hero-photo') && !el.hasAttribute('data-hero-rim'))
    let completed = false

    const fr = frame.current!.getBoundingClientRect()
    const pw = plateWrap.current!.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    // Offset that centres the plate in the viewport while the frame keeps its layout position.
    const dx = vw / 2 - (fr.left + fr.width / 2)
    const dy = vh / 2 - (fr.top + fr.height / 2)
    // Plate ellipse expressed in % of the frame – the window starts exactly at the plate rim.
    const rx0 = ((pw.width * (LOGO_ELLIPSE.rx / LOGO_VIEWBOX.w)) / fr.width) * 100
    const ry0 = ((pw.width * (LOGO_ELLIPSE.ry / LOGO_VIEWBOX.w)) / fr.height) * 100
    const mobile = vw < 768

    const ctx = gsap.context(() => {
      gsap.set(hideEls, { opacity: 0 })
      gsap.set(lines, { yPercent: 112 })
      // The window travels with the plate (no off-centre clip that the frame box would cut).
      gsap.set(photo, { x: dx, y: dy, clipPath: `ellipse(${rx0}% ${ry0}% at 50% 50%)`, opacity: 0 })
      gsap.set(rimSvg, { x: dx, y: dy, opacity: 0 })
      gsap.set(rimEllipse, { attr: { rx: `${rx0}%`, ry: `${ry0}%` } })
      gsap.set(plateWrap.current, { x: dx, y: dy, opacity: 1, scale: 1 })
      gsap.set([part('face'), part('glow')], { opacity: 0 })
      gsap.set(part('raw'), { opacity: 0 })
      gsap.set(part('rim'), { attr: { 'stroke-dashoffset': 1 } })
      gsap.set(q('text'), { fill: '#fff4ec' })
      gsap.set(q('shadow'), { opacity: 0 })
      q<SVGRectElement>('clip').forEach((r) => gsap.set(r, { attr: { width: 0 } }))
      releaseIntroHold()

      const e = LOGO_ELLIPSE
      const torch = part<SVGGElement>('torch')
      const hot = part('hot')
      const rim = part('rim')
      const weld = { p: 0 }
      const placeTorch = () => {
        const a = weld.p * Math.PI * 2
        const x = e.cx - e.rx * Math.cos(a)
        const y = e.cy - e.ry * Math.sin(a)
        torch.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${0.92 + Math.random() * 0.16})`)
        rim.setAttribute('stroke-dashoffset', String(1 - weld.p))
        hot.setAttribute('stroke-dashoffset', String(0.07 - weld.p))
      }
      placeTorch()

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          completed = true
          cleanupSkip()
          gsap.set(plateWrap.current, { display: 'none' })
          gsap.set([...hideEls, photo, rimSvg], { clearProps: 'transform' })
          ScrollTrigger.refresh()
        },
      })

      // 1 · TIG weld: the orange rim is laid around the plate.
      tl.to(part('raw'), { opacity: 1, duration: 0.35 }, 0)
        .to([torch, hot], { opacity: 1, duration: 0.12 }, 0.08)
        .to(weld, { p: 1, duration: 0.78, ease: 'power1.inOut', onUpdate: placeTorch }, 0.1)
        .to([torch, hot], { opacity: 0, duration: 0.16 }, 0.86)
        .to(part('glow'), { opacity: 0.5, duration: 0.5 }, 0.7)
        // 2 · Polish: raw steel turns into the logo's mirror gradient.
        .to(part('face'), { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.72)
        .fromTo(part('sheen'), { x: -40, opacity: 0.9 }, { x: LOGO_VIEWBOX.w + 420, duration: 0.75, ease: 'power2.inOut' }, 0.7)

      // 3 · Fiber-laser marking, line by line.
      const beam = part<SVGGElement>('beam')
      const clips = q<SVGRectElement>('clip')
      const texts = q('text')
      const shadows = q('shadow')
      LOGO_LINES.forEach((l, i) => {
        const at = 1.08 + i * 0.2
        const d = 0.3
        const y0 = l.box.y - 12
        const h = l.box.h + 24
        tl.set(beam, { opacity: 1, attr: { transform: `translate(${l.box.x - 10} ${y0}) scale(1 ${h / 100})` } }, at)
          .to(clips[i], { attr: { width: l.box.w + 34 }, duration: d, ease: 'none' }, at)
          .to(beam, { attr: { transform: `translate(${l.box.x + l.box.w + 12} ${y0}) scale(1 ${h / 100})` }, duration: d, ease: 'none' }, at)
          .to(texts[i], { fill: '#ff6429', duration: 0.45, ease: 'power1.out' }, at + d * 0.55)
          .to(shadows[i], { opacity: 0.85, duration: 0.4 }, at + d * 0.55)
      })
      tl.to(beam, { opacity: 0, duration: 0.12 }, 1.08 + 2 * 0.2 + 0.3)

      // 4 · The nameplate opens into the hero window.
      tl.addLabel('open', 1.95)
        .to(plateWrap.current, { x: 0, y: 0, duration: 0.85, ease: 'expo.inOut' }, 'open')
        .to(plateWrap.current, { opacity: 0, scale: 1.12, duration: 0.5, ease: 'power2.in' }, 'open+=0.32')
        .to(rimSvg, { x: 0, y: 0, opacity: 1, duration: 0.85, ease: 'expo.inOut' }, 'open')
        .to(rimEllipse, { attr: { rx: `${FINAL_R}%`, ry: `${FINAL_R}%` }, duration: 0.95, ease: 'expo.inOut' }, 'open')
        .set(photo, { opacity: 1 }, 'open')
        .to(photo, { x: 0, y: 0, duration: 0.85, ease: 'expo.inOut' }, 'open')
        .to(photo, { clipPath: `ellipse(${FINAL_R}% ${FINAL_R}% at 50% 50%)`, duration: 0.95, ease: 'expo.inOut' }, 'open')
        .fromTo(photoImg, { scale: 1.22 }, { scale: 1, duration: 1.5, ease: 'expo.out' }, 'open+=0.1')
        .to(lines, { yPercent: 0, duration: 1.05, stagger: 0.09, ease: 'expo.out' }, 'open+=0.4')
        .fromTo(copyEls, { y: 18 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.06, ease: 'expo.out' }, 'open+=0.5')
      if (mobile) tl.timeScale(1.18)

      // Never make anyone wait: any interaction completes the intro immediately.
      const skip = () => tl.progress(1)
      const evts = ['pointerdown', 'keydown', 'wheel', 'touchmove'] as const
      evts.forEach((ev) => window.addEventListener(ev, skip, { passive: true, once: true }))
      const cleanupSkip = () => evts.forEach((ev) => window.removeEventListener(ev, skip))

      return () => cleanupSkip()
    }, root)

    return () => {
      // Interrupted before finishing (e.g. React StrictMode's dev double mount) – allow a replay.
      if (!completed) introState.played = false
      ctx.revert()
    }
  }, [])

  // ---------- Ambient: pointer parallax + scroll-linked ring and depth ----------
  useEffect(() => {
    if (prefersReducedMotion()) return
    setupGsap()
    const el = root.current!
    const img = el.querySelector<HTMLElement>('[data-hero-photo] img')
    const fine = window.matchMedia('(pointer: fine)').matches
    const xTo = img && fine ? gsap.quickTo(img, 'xPercent', { duration: 1.2, ease: 'power3.out' }) : null
    const yTo = img && fine ? gsap.quickTo(img, 'yPercent', { duration: 1.2, ease: 'power3.out' }) : null
    const onMove = (e: PointerEvent) => {
      if (!xTo || !yTo) return
      xTo(((e.clientX / window.innerWidth) - 0.5) * -3)
      yTo(((e.clientY / window.innerHeight) - 0.5) * -3)
    }
    if (fine) el.addEventListener('pointermove', onMove)

    const ctx = gsap.context(() => {
      gsap.to('[data-hero-frame]', {
        yPercent: 10,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-hero-copy]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)
    return () => {
      el.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [])

  // Engraved ring text needs pixel geometry – measure the frame (client only).
  useEffect(() => {
    const f = frame.current
    if (!f) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setRing({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(f)
    return () => ro.disconnect()
  }, [])

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="brushed relative isolate overflow-hidden bg-ink [--brushed-opacity:0.07]"
    >
      {/* Ambient arc glow behind the window */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[8%] -z-10 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(255_98_41/0.14),transparent)]"
      />
      <div className="shell grid min-h-[100svh] items-center gap-y-8 pb-16 pt-24 lg:grid-cols-12 lg:gap-x-10 lg:pb-20 lg:pt-28">
        <div data-hero-copy className="relative z-10 order-2 lg:order-1 lg:col-span-6 xl:col-span-6">
          <p data-intro="hide" className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-steel-400">
            <span className="inline-block h-[7px] w-[12px] rounded-[50%] border-[1.5px] border-arc" aria-hidden />
            Joensuu · Käpykangas · vuodesta {company.founded}
          </p>
          <h1 id="hero-title" className="display-xl mt-6 text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                Yksi soitto,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="text-mirror block italic [--sheen:62]">
                koko verstas.
              </span>
            </span>
          </h1>
          <p data-intro="hide" className="lead mt-7 max-w-[36rem] text-steel-300">
            Koneistamme, hitsaamme, kiillotamme ja huollamme – Abloy-avainjyrsinkoneista Teknos-sävytyskoneisiin ja
            yksittäisestä varaosasta sarjatuotantoon.
          </p>
          <div data-intro="hide" className="mt-9 flex flex-wrap gap-3">
            <Link to="/yhteystiedot#tarjouspyynto" className="btn btn-arc">
              Pyydä tarjous <ArrowRight size={18} aria-hidden />
            </Link>
            <a href={company.phones[0].href} className="btn btn-ghost">
              <Phone size={17} aria-hidden className="text-arc" /> {company.phones[0].display}
            </a>
          </div>
          <dl data-intro="hide" className="mt-12 grid max-w-xl grid-cols-3 border-t border-white/10 pt-6">
            {[
              [String(company.founded), 'perustettu'],
              [`${company.premisesM2} m²`, 'verstas'],
              [String(machineCount), 'laitetta konekannassa'],
            ].map(([v, k]) => (
              <div key={k} className="flex flex-col pr-3">
                <dt className="label order-2 mt-2 block text-[0.66rem] text-steel-500">{k}</dt>
                <dd className="order-1 font-display text-[1.65rem] leading-none text-white sm:text-[2rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[34rem] sm:max-w-[36rem] lg:order-2 lg:col-span-6 lg:max-w-none">
          <div data-hero-frame className="relative">
            <div ref={frame} className="relative mx-auto aspect-square w-full sm:aspect-[6/5] lg:aspect-[11/12] lg:w-[min(100%,calc((100svh-11rem)*0.9167))]">
              <div data-intro="hide" data-hero-photo className="absolute inset-0 overflow-hidden" style={{ clipPath: `ellipse(${FINAL_R}% ${FINAL_R}% at 50% 50%)` }}>
                <Picture
                  slug="ristikkovanne-kiillotettu"
                  alt="Ristikkopuolainen alumiinivanne peilikiillotettuna Sarolan verstaalla."
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  priority
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover will-change-transform"
                  position="50% 46%"
                />
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_45%,rgb(11_12_14/0.55))]" />
              </div>
              <svg data-intro="hide" data-hero-rim aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <ellipse cx="50%" cy="50%" rx={`${FINAL_R}%`} ry={`${FINAL_R}%`} fill="none" stroke="#ff6229" strokeWidth="1.5" />
              </svg>
              <div data-intro="hide" data-hero-ring aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
                {ring && <RingText w={ring.w} h={ring.h} />}
              </div>
              <div
                ref={plateWrap}
                data-hero-plate
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[82%] max-w-[36rem] -translate-x-1/2 -translate-y-1/2 sm:w-[66%]"
                style={{ opacity: 0 }}
              >
                <IntroPlate ref={plate} />
              </div>
            </div>
            <p data-intro="hide" className="label mt-5 text-center text-steel-500 md:mt-12">
              Kiillotettu ristikkovanne · 10/2024
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Process names engraved around the window like a dial ring (decorative). */
function RingText({ w, h }: { w: number; h: number }) {
  const pad = Math.max(16, w * 0.035)
  const rx = w / 2 + pad
  const ry = h / 2 + pad
  const cx = w / 2
  const cy = h / 2
  const d = `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 1 ${rx * 2} 0 a ${rx} ${ry} 0 1 1 ${-rx * 2} 0`
  const phrase = 'KONEISTUS · TIG-HITSAUS · TÄRYKIILLOTUS · LASERMERKKAUS · ABLOY-HUOLLOT · TEKNOS-HUOLLOT · '
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full overflow-visible">
        <path id="hero-ring-path" d={d} fill="none" />
        <text className="fill-steel-500 font-mono text-[10.5px] tracking-[0.32em]">
          <textPath href="#hero-ring-path" startOffset="0" textLength={Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry))) - 4} lengthAdjust="spacing">
            {phrase + phrase}
          </textPath>
        </text>
      </svg>
  )
}
