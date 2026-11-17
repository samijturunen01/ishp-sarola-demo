import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { TintRing } from '../components/art/TintRing'
import { ContactCta } from '../components/ui/ContactCta'
import { services } from '../data/services'

const also = [
  'Lasermerkkaus',
  'Tärykiillotus',
  'Automaatio- ja kokoonpanotyöt',
  'Sopimusvalmistus',
  'Prototyypit',
  'Korjauskoneistukset',
  'Tuote- ja osavalmistus',
  'Harrasteosat',
  'Suunnittelu ja mallinnus (Fusion 360)',
  'Abloy-varaosien valmistus',
]

export function Services() {
  return (
    <>
      <PageHero
        variant="type"
        crumbs={[{ to: '/palvelut', label: 'Palvelut' }]}
        kicker="Palvelut"
        title={
          <>
            Moniosaamista <span className="text-mirror italic [--sheen:58]">yhdellä soitolla.</span>
          </>
        }
        lead="Palvelemme yrityksiä ja yksityishenkilöitä monipuolisilla koneistus- ja huoltopalveluilla Itä-Suomen alueella. Laaja yhteistyöverkostomme täydentää omaa konekantaamme."
      />

      <section aria-label="Palvelut" className="bg-ink pb-24 sm:pb-32">
        <div className="shell space-y-24 sm:space-y-32">
          {services.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article key={s.key} className="grid items-center gap-10 lg:grid-cols-12" aria-labelledby={`palvelu-${s.key}`}>
                <Link
                  to={s.path}
                  tabIndex={-1}
                  aria-hidden
                  className={`group relative block lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}
                  data-reveal="oval"
                >
                  <div className="oval aspect-[5/4] overflow-hidden">
                    {s.image ? (
                      <Picture
                        slug={s.image}
                        alt=""
                        sizes="(min-width: 1024px) 46vw, 92vw"
                        className="h-full w-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                    ) : (
                      <TintRing className="h-full w-full" />
                    )}
                  </div>
                </Link>
                <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : 'lg:col-start-8'}`}>
                  <p className="label text-arc" data-reveal>
                    {s.index} · {s.short}
                  </p>
                  <h2 id={`palvelu-${s.key}`} className="display-md mt-4 text-white" data-reveal>
                    {s.title}
                  </h2>
                  <p className="lead mt-5 text-steel-300" data-reveal data-delay="0.06">
                    {s.summary}
                  </p>
                  <Link to={s.path} className="btn btn-ghost mt-8" data-reveal data-delay="0.1">
                    Lue lisää <span className="sr-only">: {s.title}</span>
                    <ArrowRight size={18} aria-hidden />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="myos" className="brushed brushed-light bg-mirror py-24 text-ink sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-arc-deep">Lisäksi</p>
            <h2 id="myos" className="display-md mt-5">
              Myös nämä onnistuvat.
            </h2>
            <Link to="/yritys#konekanta" className="link-weld mt-8 inline-flex items-center gap-2 font-semibold">
              Katso konekanta <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-8" data-reveal="stagger">
            {also.map((a) => (
              <li key={a} className="rounded-full border border-ink/15 bg-white px-5 py-3 text-[1.02rem]">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
