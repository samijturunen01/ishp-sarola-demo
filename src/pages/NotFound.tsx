import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '../data/services'

export function NotFound() {
  return (
    <section className="brushed relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pb-20 pt-32 [--brushed-opacity:0.07]">
      {/* An unfinished weld: the nameplate rim stops short. */}
      <svg aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[130vw] max-w-none -translate-x-1/2 -translate-y-1/2 sm:w-[90vw]" viewBox="0 0 912 360">
        <ellipse cx="456" cy="180" rx="450" ry="174" fill="none" stroke="#ff6229" strokeWidth="1.5" pathLength={1} strokeDasharray="0.72 1" opacity=".55" transform="rotate(180 456 180)" />
        <circle cx="540" cy="351" r="5" fill="#ff8a52" />
      </svg>
      <div className="shell">
        <p className="label text-arc">Virhe 404</p>
        <h1 className="display-xl mt-6 max-w-[14ch] text-white">
          Tätä osaa ei löytynyt <span className="text-mirror italic [--sheen:55]">hyllystä.</span>
        </h1>
        <p className="lead mt-7 max-w-xl text-steel-300">
          Sivu on voinut siirtyä tai osoitteessa on kirjoitusvirhe. Tästä pääset jatkamaan:
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-arc">
            Etusivulle <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/yhteystiedot" className="btn btn-ghost">
            Ota yhteyttä
          </Link>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {services.map((s) => (
            <li key={s.key}>
              <Link to={s.path} className="link-weld text-steel-200">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
