import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { services, type ServiceKey } from '../../data/services'

/** Previous / next service – keeps visitors moving between the service pages. */
export function ServicePager({ current }: { current: ServiceKey }) {
  const i = services.findIndex((s) => s.key === current)
  const prev = services[(i - 1 + services.length) % services.length]
  const next = services[(i + 1) % services.length]
  return (
    <nav aria-label="Muut palvelut" className="border-t border-white/10 bg-ink">
      <div className="shell grid sm:grid-cols-2">
        <Link to={prev.path} className="group flex items-center gap-5 border-b border-white/10 py-10 sm:border-b-0 sm:border-r sm:pr-8">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-arc group-hover:text-arc">
            <ArrowLeft size={18} aria-hidden />
          </span>
          <span>
            <span className="label block text-steel-500">Edellinen palvelu</span>
            <span className="mt-1 block font-display text-2xl text-white">{prev.title}</span>
          </span>
        </Link>
        <Link to={next.path} className="group flex items-center justify-end gap-5 py-10 text-right sm:pl-8">
          <span>
            <span className="label block text-steel-500">Seuraava palvelu</span>
            <span className="mt-1 block font-display text-2xl text-white">{next.title}</span>
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-arc group-hover:text-arc">
            <ArrowRight size={18} aria-hidden />
          </span>
        </Link>
      </div>
    </nav>
  )
}
