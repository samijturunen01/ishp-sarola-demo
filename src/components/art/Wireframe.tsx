/**
 * Illustration: an isometric wireframe of a machined block – evokes a 3D model
 * in CAD. Abstract drawing, not a customer part.
 */
export function Wireframe({ className }: { className?: string }) {
  // isometric projection helpers
  const iso = (x: number, y: number, z: number) => {
    const px = 200 + (x - y) * 0.866
    const py = 215 + (x + y) * 0.5 - z
    return `${px.toFixed(1)} ${py.toFixed(1)}`
  }
  const box = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) =>
    [
      `M${iso(x0, y0, z1)}L${iso(x1, y0, z1)}L${iso(x1, y1, z1)}L${iso(x0, y1, z1)}Z`,
      `M${iso(x1, y0, z1)}L${iso(x1, y0, z0)}L${iso(x1, y1, z0)}L${iso(x1, y1, z1)}`,
      `M${iso(x0, y1, z1)}L${iso(x0, y1, z0)}L${iso(x1, y1, z0)}`,
    ].join('')
  const ellipseAt = (x: number, y: number, z: number, r: number) => {
    const [cx, cy] = iso(x, y, z).split(' ').map(Number)
    return { cx, cy, rx: r * 1.22, ry: r * 0.7 }
  }
  const holeA = ellipseAt(-40, -40, 60, 22)
  const holeB = ellipseAt(55, 55, 60, 14)
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <defs>
        <pattern id="wf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#2f343a" strokeWidth=".7" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="#121417" />
      <rect width="400" height="400" fill="url(#wf-grid)" />
      <g fill="none" stroke="#d5d8dc" strokeWidth="1.4" strokeLinejoin="round">
        <path d={box(-100, -100, 0, 100, 100, 60)} />
        <path d={box(-30, -100, 60, 100, 30, 110)} stroke="#ff6229" />
        <ellipse {...holeA} />
        <ellipse {...holeB} />
        <path d={`M${iso(-100, -100, 0)}L${iso(-100, -100, 60)}`} strokeDasharray="4 4" opacity=".5" />
      </g>
      <g fill="#8d939b" fontFamily="Azeret Mono Variable, monospace" fontSize="10" letterSpacing="1.5">
        <text x="24" y="380">MALLI.F3D</text>
        <text x="300" y="380">ISO</text>
      </g>
    </svg>
  )
}
