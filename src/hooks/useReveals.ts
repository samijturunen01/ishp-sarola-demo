import { useEffect } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger, setupGsap } from '../lib/motion'

/**
 * Scroll reveals for every element with data-reveal inside <main>.
 *   data-reveal="up" (default) | "fade" | "oval" | "wipe" | "stagger"
 *   data-delay="0.1"
 * Elements are hidden by CSS only while JS runs (html.js), and are revealed
 * instantly when the visitor prefers reduced motion.
 */
export function useReveals(key: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('main [data-reveal]'))
    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    setupGsap()
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const type = el.dataset.reveal || 'up'
        const delay = Number(el.dataset.delay || 0)
        const from: gsap.TweenVars = { opacity: 0 }
        const to: gsap.TweenVars = { opacity: 1, duration: 1.1, ease: 'expo.out', delay }
        let targets: gsap.TweenTarget = el

        if (type === 'up') {
          from.y = 34
          to.y = 0
        } else if (type === 'oval') {
          // Open to the element's own resting shape (e.g. .oval) – or past the corners.
          const rest = getComputedStyle(el).clipPath
          from.clipPath = 'ellipse(8% 6% at 50% 50%)'
          to.clipPath = rest && rest !== 'none' ? rest : 'ellipse(75% 75% at 50% 50%)'
          to.duration = 1.6
        } else if (type === 'wipe') {
          from.clipPath = 'inset(0% 0% 100% 0%)'
          to.clipPath = 'inset(0% 0% 0% 0%)'
          to.duration = 1.3
        } else if (type === 'stagger') {
          gsap.set(el, { opacity: 1 })
          targets = Array.from(el.children)
          gsap.set(targets, { opacity: 0, y: 26 })
          Object.assign(to, { y: 0, stagger: 0.08, duration: 0.9 })
        }

        if (type !== 'stagger') gsap.set(el, from)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            el.classList.add('is-in')
            gsap.to(targets, to)
          },
        })
      })
    })
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(refresh)
      ctx.revert()
    }
  }, [key])
}
