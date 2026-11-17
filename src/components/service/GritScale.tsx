import { useEffect, useId, useRef, useState } from 'react'

const MIN = 120
const MAX = 2000

/** Log-scale mapping so the coarse end gets as much travel as the fine end. */
const toGrit = (t: number) => Math.round(Math.exp(Math.log(MIN) + t * (Math.log(MAX) - Math.log(MIN))))
const toT = (g: number) => (Math.log(g) - Math.log(MIN)) / (Math.log(MAX) - Math.log(MIN))

/**
 * Interactive illustration of the Tuvel sanding strip grit range (P120–P2000).
 * A procedurally drawn abrasive surface gets finer as the slider moves – an
 * abstract visual, not a product photo.
 */
export function GritScale() {
  const [t, setT] = useState(toT(400))
  const canvas = useRef<HTMLCanvasElement>(null)
  const id = useId()
  const grit = toGrit(t)

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const w = c.clientWidth
    const h = c.clientHeight
    c.width = Math.round(w * dpr)
    c.height = Math.round(h * dpr)
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    // Paper backing
    ctx.fillStyle = '#2b2622'
    ctx.fillRect(0, 0, w, h)
    // Grain: size and spacing shrink with higher grit numbers.
    const size = 5.2 * Math.pow(MIN / grit, 0.62) + 0.35
    const count = Math.min(26000, Math.round((w * h) / (size * size * 2.1)))
    let seed = 7
    const rnd = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < count; i++) {
      const x = rnd() * w
      const y = rnd() * h
      const r = size * (0.45 + rnd() * 0.75)
      const l = 40 + rnd() * 50
      ctx.fillStyle = `hsl(25 8% ${l}%)`
      ctx.beginPath()
      ctx.moveTo(x, y - r)
      ctx.lineTo(x + r * (0.6 + rnd() * 0.5), y + r * 0.2)
      ctx.lineTo(x - r * (0.4 + rnd() * 0.5), y + r * (0.6 + rnd() * 0.4))
      ctx.closePath()
      ctx.fill()
      if (rnd() > 0.7) {
        ctx.fillStyle = 'rgb(255 255 255 / .55)'
        ctx.fillRect(x, y - r * 0.6, Math.max(0.6, r * 0.25), Math.max(0.6, r * 0.25))
      }
    }
  }, [grit])

  return (
    <div className="rounded-[2rem] bg-ink p-5 text-white sm:p-8">
      <div className="relative overflow-hidden rounded-[1.4rem]">
        <canvas ref={canvas} className="block h-56 w-full sm:h-72" aria-hidden />
        <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-ink/85 px-4 py-2 backdrop-blur">
          <span className="label text-steel-400">Karkeus</span>
          <output htmlFor={id} className="ml-3 font-display text-2xl text-arc">
            P{grit}
          </output>
        </div>
      </div>
      <label htmlFor={id} className="label mt-7 block text-steel-400">
        Liu'uta karkeasta hienoon
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={1000}
        value={Math.round(t * 1000)}
        onChange={(e) => setT(Number(e.target.value) / 1000)}
        aria-valuetext={`P${grit}`}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(90deg,#5d636b,#eef0f1)] accent-[#ff6229] [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[50%] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-arc [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:rounded-[50%] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-arc"
      />
      <div className="mt-3 flex justify-between font-mono text-xs text-steel-400">
        <span>P120 · karkea</span>
        <span>P2000 · hieno</span>
      </div>
      <p className="mt-6 text-xs text-steel-500">
        Havainnekuva karkeusalueesta, ei tuotekuva. Kysy saatavilla olevat karkeudet ja liuskakoot.
      </p>
    </div>
  )
}
