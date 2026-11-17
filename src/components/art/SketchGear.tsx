import { useMemo } from 'react'

/**
 * Illustration: a gear sketched on grid paper – the "ruutupaperiluonnos" the
 * company says it can machine from. Abstract drawing, not a technical document.
 * Strokes carry data-draw so a timeline can draw them in.
 */
export function SketchGear({ className }: { className?: string }) {
  const gear = useMemo(() => gearPath(200, 200, 18, 112, 96, 0.42), [])
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <defs>
        <pattern id="sg-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="#9fb6c9" strokeWidth=".6" opacity=".55" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="#f2f0e9" />
      <rect width="400" height="400" fill="url(#sg-grid)" />
      <g fill="none" stroke="#23262b" strokeLinecap="round" strokeLinejoin="round">
        <path data-draw d="M200 60V340M60 200H340" strokeWidth="1" strokeDasharray="10 5 2 5" opacity=".6" />
        <path data-draw d={gear} strokeWidth="2.2" />
        <circle data-draw cx="200" cy="200" r="44" strokeWidth="2" />
        <circle data-draw cx="200" cy="200" r="17" strokeWidth="2" />
        <path data-draw d="M195 183V176H205V183" strokeWidth="2" />
        <path data-draw d="M318 200H362M318 200l8-4M318 200l8 4" strokeWidth="1.2" stroke="#b23a0e" />
        <path data-draw d="M200 318V362M200 318l-4 8M200 318l4 8" strokeWidth="1.2" stroke="#b23a0e" />
      </g>
      <text x="300" y="352" fill="#b23a0e" fontFamily="Azeret Mono Variable, monospace" fontSize="11" letterSpacing="2">
        LUONNOS
      </text>
    </svg>
  )
}

function gearPath(cx: number, cy: number, teeth: number, ro: number, ri: number, land: number) {
  const pts: string[] = []
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const t = step * land
    const f = step * 0.12
    const seq: [number, number][] = [
      [a, ri],
      [a + f, ro],
      [a + f + t, ro],
      [a + 2 * f + t, ri],
    ]
    seq.forEach(([ang, r], j) => {
      const x = (cx + r * Math.cos(ang)).toFixed(1)
      const y = (cy + r * Math.sin(ang)).toFixed(1)
      pts.push(`${i === 0 && j === 0 ? 'M' : 'L'}${x} ${y}`)
    })
    const nextA = (i + 1) * step
    pts.push(`A${ri} ${ri} 0 0 1 ${(cx + ri * Math.cos(nextA)).toFixed(1)} ${(cy + ri * Math.sin(nextA)).toFixed(1)}`)
  }
  return pts.join('') + 'Z'
}
