/**
 * Abstract illustration for the Teknos tinting-machine service: a ring of
 * colorant canisters around a dispensing nozzle. Decorative graphic only –
 * not a depiction of a specific machine.
 */
const colors = ['#ff6229', '#f2c230', '#2f7d4f', '#1f5fa8', '#7a3f9a', '#c2272d', '#0e0f11', '#f7f7f6', '#8a5a2b', '#3aa6b9', '#e58aa1', '#5d636b']

export function TintRing({ className }: { className?: string }) {
  const n = colors.length
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <defs>
        <radialGradient id="tr-bg" cx=".5" cy=".45" r=".7">
          <stop offset="0" stopColor="#2a2e33" />
          <stop offset="1" stopColor="#0b0c0e" />
        </radialGradient>
        <linearGradient id="tr-can" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".0" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#tr-bg)" />
      <g data-spin style={{ transformOrigin: '200px 200px' }}>
        {colors.map((c, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          const x = 200 + 128 * Math.cos(a)
          const y = 200 + 128 * Math.sin(a)
          return (
            <g key={c} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((a * 180) / Math.PI + 90).toFixed(1)})`}>
              <rect x="-17" y="-30" width="34" height="60" rx="6" fill="#d5d8dc" />
              <rect x="-13" y="-22" width="26" height="40" rx="3" fill={c} />
              <rect x="-17" y="-30" width="34" height="60" rx="6" fill="url(#tr-can)" />
            </g>
          )
        })}
      </g>
      <circle cx="200" cy="200" r="64" fill="#121417" stroke="#ff6229" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="22" fill="#2f343a" />
      <circle cx="200" cy="200" r="6" fill="#ff6229" />
    </svg>
  )
}
