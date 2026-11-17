import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LogoPlate } from '../brand/LogoPlate'
import { company } from '../../data/company'
import { mainNav } from '../../data/seo'
import { services } from '../../data/services'
import { scrollTopNow } from './ScrollManager'

export function Footer() {
  return (
    <footer className="brushed relative overflow-hidden border-t border-white/10 bg-ink pb-28 pt-20 text-steel-300 [--brushed-opacity:0.05] lg:pb-12">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" onClick={scrollTopNow} className="inline-block rounded-[50%]" aria-label="Etusivulle">
              <LogoPlate title={null} className="h-20 w-auto" />
            </Link>
            <p className="mt-8 max-w-md font-display text-[1.6rem] leading-snug text-white">
              Koneistus, hitsaus, kiillotus ja huollot – Joensuun Käpykankaalla vuodesta {company.founded}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="label mb-5 text-steel-500">Yhteystiedot</h2>
              <address className="space-y-3 not-italic">
                <p className="text-white">{company.name}</p>
                <p>
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}
                </p>
                <p>
                  {company.phones.map((p) => (
                    <a key={p.href} href={p.href} className="link-weld block w-fit text-white">
                      {p.display}
                    </a>
                  ))}
                </p>
                <p>
                  <a href={`mailto:${company.email}`} className="link-weld text-white">
                    {company.email}
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h2 className="label mb-5 text-steel-500">Sivut</h2>
              <ul className="space-y-2.5">
                {mainNav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} onClick={scrollTopNow} className="hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="label mb-5 text-steel-500">Palvelut</h2>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s.key}>
                    <Link to={s.path} className="hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="divider-oval mt-16" />

        <div className="mt-8 grid gap-6 text-sm text-steel-400 md:grid-cols-3">
          <dl className="space-y-1">
            <div className="flex gap-2">
              <dt>Y-tunnus</dt>
              <dd className="text-steel-200">{company.businessId}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Verkkolaskuosoite</dt>
              <dd className="text-steel-200">{company.einvoice.address}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Operaattori</dt>
              <dd className="text-steel-200">
                {company.einvoice.operator} {company.einvoice.operatorId}
              </dd>
            </div>
          </dl>
          <p className="md:text-center">
            © {new Date().getFullYear()} {company.name}
          </p>
          <p className="md:text-right">
            Konseptidemo:{' '}
            <a
              href="https://github.com/samijturunen01/hadesdesign"
              className="link-weld inline-flex items-center gap-1 text-steel-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hades Design <ArrowUpRight size={13} aria-hidden />
            </a>
            <span className="mt-1 block text-steel-500">Ei yrityksen virallinen sivusto.</span>
          </p>
        </div>
      </div>

      {/* Oversized engraved wordmark – decorative. */}
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] font-bold leading-none tracking-[-0.04em] text-white/[0.025]"
      >
        Sarola
      </p>
    </footer>
  )
}
