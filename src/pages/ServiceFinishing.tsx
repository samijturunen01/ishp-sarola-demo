import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { ServicePager } from '../components/service/ServicePager'
import { LaserMark } from '../components/service/LaserMark'
import { ContactCta } from '../components/ui/ContactCta'
import { galleryBySlug } from '../data/gallery'
import type { ImageSlug } from '../data/imageManifest'

const polished: ImageSlug[] = ['moottorin-kotelo-kiillotettu', 'rivoitetut-kannet-kiillotettu', 'kiillotetut-osat', 'alumiinikappaleet-peili']

export function ServiceFinishing() {
  const before = galleryBySlug('ristikkovanne-tyon-alla')!
  const after = galleryBySlug('ristikkovanne-kiillotettu')!
  return (
    <>
      <PageHero
        variant="bleed"
        crumbs={[
          { to: '/palvelut', label: 'Palvelut' },
          { to: '/palvelut/kiillotus-ja-lasermerkkaus', label: 'Kiillotus & lasermerkkaus' },
        ]}
        kicker="04 · Kiillotus & lasermerkkaus"
        title={
          <>
            <span className="text-mirror [--sheen:45]">Peilikirkas</span> on työtä.
          </>
        }
        lead="Tärykiillotusta Rösler R300 -koneella ja vanteille Gostolilla – sekä pysyvät merkinnät 30 W fiber-laserilla."
        image={{ slug: 'vanteet-kiillotettu', alt: 'Neljä kiillotettua kaksoispuolaista alumiinivannetta verstaan lattialla.', position: '50% 50%' }}
        caption="Neljä kiillotettua vannetta · 8/2024"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/yhteystiedot?palvelu=kiillotus#tarjouspyynto" className="btn btn-arc">
            Kysy kiillotuksesta <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/yhteystiedot?palvelu=laser#tarjouspyynto" className="btn btn-ghost">
            Lasermerkkaus
          </Link>
        </div>
      </PageHero>

      {/* Tärykiillotus */}
      <section aria-labelledby="tarykiillotus" className="bg-ink py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-arc" data-reveal>
              Tärykiillotus
            </p>
            <h2 id="tarykiillotus" className="display-md mt-5 text-white" data-reveal>
              Moottorin kansista pienosiin.
            </h2>
            <p className="mt-6 text-steel-300" data-reveal data-delay="0.08">
              Kiillotamme metalliosia peilipintaan – galleriassa esimerkiksi moottorin kansia, kotelonpuoliskoja ja koneistettuja
              kappaleita. Tärykiillotukseen käytössä on Rösler R300.
            </p>
            <dl className="mt-10 space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between gap-4">
                <dt className="label text-steel-500">Tärykiillotus</dt>
                <dd className="font-mono text-sm text-white">Rösler R300</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label text-steel-500">Vanteet yms.</dt>
                <dd className="font-mono text-sm text-white">Gostol</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="label text-steel-500">Pintakäsittely</dt>
                <dd className="font-mono text-sm text-white">Lasikuulapuhallus</dd>
              </div>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-8" data-reveal="stagger">
            {polished.map((slug, i) => {
              const g = galleryBySlug(slug)!
              return (
                <figure key={slug} className={i % 2 === 1 ? 'mt-12' : ''}>
                  <Picture slug={slug} alt={g.alt} sizes="(min-width: 1024px) 32vw, 46vw" className="aspect-[3/4] overflow-hidden rounded-[1.8rem]" />
                  <figcaption className="mt-3 flex justify-between gap-3 text-sm text-steel-400">
                    <span>{g.title}</span>
                    <span className="label text-steel-500">{g.date}</span>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wheels: in progress → finished */}
      <section aria-labelledby="vanteet" className="brushed brushed-light bg-mirror py-24 text-ink sm:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-arc-deep" data-reveal>
                Vanteet
              </p>
              <h2 id="vanteet" className="display-lg mt-5" data-reveal>
                Työn alla – ja valmiina.
              </h2>
            </div>
            <p className="lead text-steel-700 lg:col-span-5" data-reveal data-delay="0.08">
              Ristikkovanteita verstaalla lokakuussa 2024 – työn alla (7.10.) ja kiillotettuna (10.10.).
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[before, after].map((g, i) => (
              <figure key={g.slug} data-reveal="oval" data-delay={String(i * 0.12)}>
                <Picture slug={g.slug} alt={g.alt} sizes="(min-width: 768px) 46vw, 92vw" className="oval aspect-square overflow-hidden" />
                <figcaption className="mt-5 flex items-baseline justify-center gap-4">
                  <span className="font-display text-2xl">{g.title}</span>
                  <span className="label text-steel-600">{g.date}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center">
            <Picture
              slug="vanne-klassikko-kiillotettu"
              alt="Viisipuolainen klassikkovanne kiillotettuna kromimaiseen kiiltoon."
              sizes="(min-width: 768px) 38vw, 92vw"
              className="aspect-[4/5] overflow-hidden rounded-[2rem]"
            />
            <div>
              <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight">
                Klassikkovanteista nykyaikaisiin kaksoispuoliin. Vanteiden ja vastaavien kappaleiden tärykiillotukseen käytössä on Gostol.
              </p>
              <Link to="/galleria" className="link-weld mt-8 inline-flex items-center gap-2 font-semibold">
                Lisää kuvia galleriassa <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Laser */}
      <section aria-labelledby="laser" className="bg-ink-2 py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="label text-arc" data-reveal>
              Lasermerkkaus
            </p>
            <h2 id="laser" className="display-md mt-5 text-white" data-reveal>
              Pysyvä merkintä fiber-laserilla.
            </h2>
            <p className="mt-6 text-steel-300" data-reveal data-delay="0.08">
              Lasermerkkaus 30 W fiber-lasermerkkauskoneella – pysyvät merkinnät osiin ja tuotteisiin.
            </p>
            <figure className="mt-10" data-reveal>
              <Picture
                slug="lasermerkkauskone"
                alt="Fiber-lasermerkkauskone ja sitä ohjaava kannettava tietokone työpisteellä."
                sizes="(min-width: 1024px) 36vw, 92vw"
                className="aspect-[4/3] overflow-hidden rounded-[1.8rem]"
              />
              <figcaption className="label mt-3 text-steel-500">Fiber-lasermerkkauskone · 4/2021</figcaption>
            </figure>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <LaserMark />
          </div>
        </div>
      </section>

      <ContactCta title="Mikä saa kiiltää?" topic="kiillotus" />
      <ServicePager current="kiillotus" />
    </>
  )
}
