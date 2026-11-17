import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/** Register GSAP plugins once (client only). */
export function setupGsap() {
  if (registered || typeof window === 'undefined') return gsap
  gsap.registerPlugin(ScrollTrigger)
  gsap.config({ nullTargetWarn: false })
  registered = true
  return gsap
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }
