import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, setupGsap } from '../../lib/motion'

/**
 * Demonstration of fiber-laser marking: a beam rasters across a brushed plate
 * and leaves engraved text behind. Plays once when scrolled into view.
 * Purely illustrative – the text is a sample, not a customer marking.
 */
export function LaserMark({ text = 'ISHP · SAROLA', sub = 'FIBER-LASER 30 W' }: { text?: string; sub?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    setupGsap()
    const el = ref.current!
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
      gsap.set('[data-lm-mask]', { clipPath: 'inset(0 100% 0 0)' })
      gsap.set('[data-lm-beam]', { left: '0%', opacity: 0 })
      tl.to('[data-lm-beam]', { opacity: 1, duration: 0.15 })
        .to('[data-lm-mask]', { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'none' }, 0.1)
        .to('[data-lm-beam]', { left: '100%', duration: 1.8, ease: 'none' }, 0.1)
        .to('[data-lm-beam]', { opacity: 0, duration: 0.25 })
        .fromTo('[data-lm-glow]', { opacity: 0.9 }, { opacity: 0, duration: 1.2 }, 0.6)
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true, onEnter: () => tl.play() } })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#3a3f45,#6f757c_55%,#b7bcc2)] p-8 sm:p-12">
      <div aria-hidden className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ background: 'repeating-linear-gradient(0deg, rgb(255 255 255 / .25) 0 1px, transparent 1px 3px)' }} />
      <div className="relative">
        <div data-lm-mask className="relative">
          <p className="whitespace-nowrap font-mono text-[clamp(1.35rem,3.2vw,2.9rem)] font-semibold tracking-[0.12em] text-[#1b1d20] [text-shadow:0_1px_0_rgb(255_255_255/0.35)]">
            {text}
          </p>
          <p className="mt-3 font-mono text-[0.8rem] tracking-[0.35em] text-[#24282d]">{sub}</p>
          <div data-lm-glow aria-hidden className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen [background:linear-gradient(90deg,transparent,rgb(255_138_82/0.6))]" />
        </div>
        <div data-lm-beam aria-hidden className="pointer-events-none absolute -bottom-4 -top-4 w-[3px] -translate-x-1/2 opacity-0">
          <div className="h-full w-full bg-[linear-gradient(180deg,transparent,#fff4ec_30%,#fff4ec_70%,transparent)] shadow-[0_0_18px_4px_rgb(255_138_82/0.75)]" />
        </div>
      </div>
      <p className="label relative mt-8 text-[#1b1d20]/70">Havainnollistus lasermerkinnästä</p>
    </div>
  )
}
