import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Picture } from '../ui/Picture'
import { company } from '../../data/company'

export function CompanyBand() {
  return (
    <section aria-labelledby="yritys-otsikko" className="brushed brushed-light relative overflow-hidden bg-mirror-2 py-24 text-ink sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="relative order-2 lg:order-1 lg:col-span-5">
          <div className="oval relative mx-auto aspect-[4/5] w-[86%] overflow-hidden sm:w-[70%] lg:w-full" data-reveal="oval">
            <Picture
              slug="verstas-lylykoskentie"
              alt="Sarolan verstasrakennus Lylykoskentie 31:ssä, seinässä ISHP.FI-kyltti."
              sizes="(min-width: 1024px) 38vw, 80vw"
              className="h-full w-full"
              position="38% 50%"
            />
          </div>
          <p className="label mt-5 text-center text-steel-600">
            {company.address.street} · {company.address.district}
          </p>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <p className="label text-arc-deep" data-reveal>
            Yritys
          </p>
          <h2 id="yritys-otsikko" className="display-lg mt-5" data-reveal>
            Käpykankaalla vuodesta {company.founded}.
          </h2>
          <div className="prose-sarola lead mt-7 max-w-[36rem] text-steel-700" data-reveal data-delay="0.08">
            <p>
              Olemme vuonna {company.founded} perustettu teollisuusalan yritys. Toimimme {company.premisesM2} m²:n tiloissa Joensuun
              Käpykankaalla ja palvelemme yrityksiä ja yksityishenkilöitä Itä-Suomen alueella.
            </p>
            <p>Meille on tärkeää jatkuva toiminnan parantaminen ja kehittäminen asiakkaiden tarpeiden mukaan.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2" data-reveal="stagger">
            <Link
              to="/yritys"
              className="group flex items-center justify-between gap-4 rounded-[1.6rem] bg-ink px-6 py-5 text-white transition-colors hover:bg-steel-800"
            >
              <span>
                <span className="label block text-arc">Yritys</span>
                <span className="mt-1 block font-display text-xl">Tarina ja konekanta</span>
              </span>
              <ArrowRight size={20} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/tuotteet"
              className="group flex items-center justify-between gap-4 rounded-[1.6rem] border border-ink/15 bg-white px-6 py-5 transition-colors hover:border-arc-deep"
            >
              <span>
                <span className="label block text-arc-deep">Tuotteet</span>
                <span className="mt-1 block font-display text-xl">Tuvel-hiomaliuskat</span>
              </span>
              <ArrowRight size={20} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
