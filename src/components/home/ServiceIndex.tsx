import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { Picture } from '../ui/Picture'
import { TintRing } from '../art/TintRing'
import { gsap, setupGsap } from '../../lib/motion'

/**
 * Editorial service index. On desktop an elliptical preview – the nameplate
 * shape again – follows the pointer and shows the work behind each row.
 */
export function ServiceIndex() {
  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview || !window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches) return
    setupGsap()
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3.out' })
    const onMove = (e: PointerEvent) => {
      const r = list.getBoundingClientRect()
      xTo(e.clientX - r.left)
      yTo(e.clientY - r.top)
    }
    list.addEventListener('pointermove', onMove)
    return () => list.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section aria-labelledby="palvelut-otsikko" className="relative bg-ink-2 py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-arc" data-reveal>
              Palvelut
            </p>
            <h2 id="palvelut-otsikko" className="display-lg mt-5 text-white" data-reveal>
              Saman katon alla.
            </h2>
          </div>
          <p className="lead text-steel-300 lg:col-span-5 lg:pb-3" data-reveal data-delay="0.1">
            Moniosaaminen ja laaja yhteistyöverkosto ovat vahvuutemme – saat tarvitsemasi palvelut yhdellä puhelinsoitolla.
          </p>
        </div>

        <div ref={listRef} className="relative mt-16" onPointerLeave={() => setActive(null)}>
        <ul className="border-t border-white/12">
          {services.map((s, i) => (
            <li key={s.key} className="border-b border-white/12" data-reveal data-delay={String(i * 0.04)}>
              <Link
                to={s.path}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-6 transition-colors duration-500 sm:grid-cols-[4rem_1fr_auto] lg:grid-cols-[5rem_1.2fr_1fr_auto] lg:py-9 ${
                  active !== null && active !== i ? 'lg:text-steel-600' : 'text-white'
                }`}
              >
                <span className="label self-start pt-2 text-arc lg:self-center lg:pt-0">{s.index}</span>
                <span className="font-display text-[clamp(1.6rem,3.4vw,3.3rem)] font-[560] leading-none tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-out-expo)] lg:group-hover:translate-x-3">
                  {s.title}
                  <span className="mt-2 block font-sans text-[0.98rem] font-normal tracking-normal text-steel-400 lg:hidden">{s.short}</span>
                </span>
                <span className="hidden text-steel-400 lg:block">{s.short}</span>
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-colors duration-500 group-hover:border-arc group-hover:bg-arc group-hover:text-ink">
                  <ArrowUpRight size={20} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

          {/* Floating oval preview (desktop pointer only) */}
          <div
            ref={previewRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
            style={{ width: 0, height: 0 }}
          >
            <div
              className={`absolute -left-[11rem] -top-[8.5rem] h-[17rem] w-[22rem] transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] ${
                active === null ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              {services.map((s, i) => (
                <div key={s.key} className={`absolute inset-0 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`}>
                  {s.image ? (
                    <Picture slug={s.image} alt="" sizes="360px" className="oval h-full w-full overflow-hidden" placeholder={false} />
                  ) : (
                    <TintRing className="oval h-full w-full" />
                  )}
                </div>
              ))}
              <div className="absolute inset-0 rounded-[50%] border-[1.5px] border-arc" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Link to="/palvelut" className="link-weld text-white">
            Kaikki palvelut ja konekanta
          </Link>
        </div>
      </div>
    </section>
  )
}
