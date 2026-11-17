import { forwardRef } from 'react'
import { LOGO_ELLIPSE, LOGO_LINES, LOGO_VIEWBOX } from './logoPaths'

/**
 * Animatable version of the nameplate used by the homepage intro.
 * Layers (bottom → top): rim glow, raw plate, polished plate, sheen,
 * laser-marked text lines (each behind its own clip rect), welded rim,
 * hot weld segment, TIG torch, laser beam. Every layer carries a data-part
 * attribute so the hero timeline can address it.
 */
export const IntroPlate = forwardRef<SVGSVGElement>(function IntroPlate(_, ref) {
  const e = LOGO_ELLIPSE
  const rimProps = {
    cx: e.cx,
    cy: e.cy,
    rx: e.rx,
    ry: e.ry,
    fill: 'none',
    pathLength: 1,
    // Start the weld at 9 o'clock and travel clockwise.
    transform: `rotate(180 ${e.cx} ${e.cy})`,
  }
  return (
    <svg ref={ref} viewBox={`0 0 ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`} className="h-auto w-full overflow-visible" aria-hidden focusable="false">
      <defs>
        <linearGradient id="ip-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.03" stopColor="#000" />
          <stop offset="0.5" stopColor="#7f7f7f" />
          <stop offset="0.96" stopColor="#f3f3f3" />
        </linearGradient>
        <linearGradient id="ip-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ip-torch">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#d6ebff" />
          <stop offset="0.55" stopColor="#ff8a52" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff6229" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ip-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff8a52" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff4ec" />
          <stop offset="1" stopColor="#ff8a52" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ip-oval">
          <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} />
        </clipPath>
        <filter id="ip-blur" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="ip-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        {LOGO_LINES.map((l) => (
          <clipPath id={`ip-clip-${l.id}`} key={l.id}>
            <rect data-part="clip" x={l.box.x - 14} y={l.box.y - 14} width={l.box.w + 34} height={l.box.h + 34} />
          </clipPath>
        ))}
      </defs>

      <ellipse data-part="glow" cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="none" stroke="#ff6a30" strokeWidth="16" opacity=".5" filter="url(#ip-blur)" />
      <ellipse data-part="raw" cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="#1c1e21" />
      <ellipse data-part="face" cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="url(#ip-plate)" />
      <g clipPath="url(#ip-oval)">
        <rect data-part="sheen" x={-260} y={-40} width={220} height={LOGO_VIEWBOX.h + 80} fill="url(#ip-sheen)" transform="skewX(-18)" opacity="0" />
      </g>

      {LOGO_LINES.map((l) => (
        <g key={l.id} clipPath={`url(#ip-clip-${l.id})`}>
          <path data-part="shadow" d={l.d} transform="translate(5 5)" fill="#1a0a04" opacity=".85" />
          <path data-part="text" d={l.d} fill="#ff6429" />
        </g>
      ))}

      <ellipse data-part="rim" {...rimProps} stroke="#ff5a1c" strokeWidth="7" strokeDasharray="1 1" strokeDashoffset="0" />
      <ellipse data-part="hot" {...rimProps} stroke="#fff3e6" strokeWidth="9" strokeDasharray="0.07 2" strokeDashoffset="1" strokeLinecap="round" filter="url(#ip-blur-sm)" opacity="0" />
      <g data-part="torch" opacity="0">
        <circle r="46" fill="url(#ip-torch)" opacity=".7" />
        <circle r="13" fill="url(#ip-torch)" />
        <circle r="4" fill="#fff" />
      </g>
      <g data-part="beam" opacity="0">
        <rect x="-5" y="0" width="10" height="100" fill="url(#ip-beam)" filter="url(#ip-blur-sm)" />
        <rect x="-1.25" y="0" width="2.5" height="100" fill="url(#ip-beam)" />
      </g>
    </svg>
  )
})
