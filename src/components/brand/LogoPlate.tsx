import { useId } from 'react'
import { LOGO_ELLIPSE, LOGO_LINES, LOGO_VIEWBOX } from './logoPaths'

interface LogoPlateProps {
  className?: string
  /** Accessible name; pass null when the surrounding link already names it. */
  title?: string | null
}

/**
 * The authentic Itä-Suomen Huoltopalvelu Sarola nameplate, rebuilt as vector
 * outlines (see scripts/build-logo.mjs). Same ellipse, gradient, rim colour,
 * serif letterforms and counters as the original bitmap.
 */
export function LogoPlate({ className, title = 'Itä-Suomen Huoltopalvelu Sarola' }: LogoPlateProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const e = LOGO_ELLIPSE
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={`plate-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.03" stopColor="#000" />
          <stop offset="0.5" stopColor="#7f7f7f" />
          <stop offset="0.96" stopColor="#f3f3f3" />
        </linearGradient>
      </defs>
      <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="none" stroke="#ff7a45" strokeWidth="14" opacity=".25" />
      <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={`url(#plate-${uid})`} stroke="#ff5a1c" strokeWidth="7" />
      <g transform="translate(5 5)" fill="#1a0a04" opacity=".85">
        {LOGO_LINES.map((l) => (
          <path key={l.id} d={l.d} />
        ))}
      </g>
      <g fill="#ff6429">
        {LOGO_LINES.map((l) => (
          <path key={l.id} d={l.d} />
        ))}
      </g>
    </svg>
  )
}
