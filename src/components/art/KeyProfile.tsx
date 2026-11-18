import { useEffect, useId, useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger, setupGsap } from '../../lib/motion'

/** Bitting cuts along the blade: centre x and depth. Abstract – not a real key code. */
const CUTS = [
  { x: 300, d: 14 },
  { x: 345, d: 27 },
  { x: 390, d: 9 },
  { x: 435, d: 22 },
  { x: 480, d: 16 },
  { x: 525, d: 30 },
] as const
const TOP = 100
const HALF = 16 // half width of a notch at the edge
const FLAT = 5 // half width of the notch floor

const profile = () =>
  `M250 ${TOP}` +
  CUTS.map((c) => `L${c.x - HALF} ${TOP}L${c.x - FLAT} ${TOP + c.d}L${c.x + FLAT} ${TOP + c.d}L${c.x + HALF} ${TOP}`).join('') +
  `L560 ${TOP}`

/**
 * Illustration for the key-machine products: a key whose bow is the nameplate
 * oval (plate gradient + orange rim). On scroll a cutter traces the bitting.
 * Decorative drawing, not a product image.
 */
export function KeyProfile({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null)
  const uid = useId().replace(/:/g, '')
  const cut = profile()
  const blade = `M214 88L250 88${cut.replace(/^M250 100/, 'L250 100')}L604 132L604 140L584 170L250 170L250 182L214 182Z`

  useEffect(() => {
    const el = svg.current
    if (!el || prefersReducedMotion()) return
    setupGsap()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
      tl.fromTo('[data-kp="cut"]', { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 1.6, ease: 'none' }, 0)
        .fromTo('[data-kp="cutter"]', { x: 250 - CUTS[CUTS.length - 1].x, opacity: 0 }, { x: 0, opacity: 1, duration: 1.6, ease: 'none' }, 0)
        .fromTo('[data-kp="spin"]', { rotation: 0 }, { rotation: 540, duration: 1.6, ease: 'none', transformOrigin: '50% 50%' }, 0)
        .fromTo('[data-kp="tick"]', { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.22, ease: 'power2.out' }, 0.2)
      ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: () => tl.play() })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={svg} viewBox="8 24 608 236" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${uid}-plate`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.03" stopColor="#000" />
          <stop offset="0.5" stopColor="#7f7f7f" />
          <stop offset="0.97" stopColor="#f3f3f3" />
        </linearGradient>
        <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d5d8dc" />
          <stop offset="0.55" stopColor="#868d95" />
          <stop offset="1" stopColor="#4a5058" />
        </linearGradient>
      </defs>

      {/* Blade + shoulder */}
      <path d={blade} fill={`url(#${uid}-steel)`} />
      <path d="M262 148H572" stroke="#2f343a" strokeWidth="5" strokeLinecap="round" />
      <path d="M262 156H560" stroke="#eef0f1" strokeOpacity=".35" strokeWidth="1" />

      {/* Bow = the nameplate oval */}
      <ellipse cx="120" cy="135" rx="104" ry="72" fill={`url(#${uid}-plate)`} stroke="#ff6229" strokeWidth="2" />
      <ellipse cx="62" cy="135" rx="17" ry="12" fill="#0b0c0e" stroke="#ff6229" strokeOpacity=".55" strokeWidth="1.2" />

      {/* Cut profile – the orange "fresh cut" edge */}
      <path data-kp="cut" d={cut} fill="none" stroke="#ff6229" strokeWidth="2.4" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" />

      {/* Depth ticks */}
      <g fontFamily="Azeret Mono Variable, ui-monospace, monospace" fontSize="11" letterSpacing="1.5" fill="#868d95">
        {CUTS.map((c, i) => (
          <g key={c.x} data-kp="tick">
            <path d={`M${c.x} ${TOP + c.d + 6}V204`} stroke="#4a5058" strokeDasharray="2 4" />
            <text x={c.x} y="222" textAnchor="middle" className="max-sm:hidden">
              {i + 1}
            </text>
          </g>
        ))}
        <text x="604" y="252" textAnchor="end" fontSize="10" letterSpacing="2.5" className="max-sm:hidden">
          AVAINPROFIILI · HAVAINNEKUVA
        </text>
      </g>

      {/* Cutter riding along the blade */}
      <g data-kp="cutter">
        <g transform={`translate(${CUTS[CUTS.length - 1].x} ${TOP - 34})`}>
          <circle r="33" fill="#0b0c0e" fillOpacity=".55" stroke="#a4aab1" strokeWidth="1.4" />
          <g data-kp="spin">
            <circle r="25" fill="none" stroke="#a4aab1" strokeOpacity=".7" strokeDasharray="3 5" />
            <path d="M-10 0H10M0 -10V10" stroke="#a4aab1" strokeOpacity=".6" />
          </g>
          <circle r="3.5" fill="#ff6229" />
        </g>
      </g>
    </svg>
  )
}
