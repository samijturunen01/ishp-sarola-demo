import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { SketchGear } from '../components/art/SketchGear'
import { Wireframe } from '../components/art/Wireframe'
import { ServicePager } from '../components/service/ServicePager'
import { ContactCta } from '../components/ui/ContactCta'
import { machineGroups } from '../data/machines'

const starts = [
  {
    id: 'luonnos',
    tab: 'Luonnos',
    title: 'Ruutupaperille piirretty luonnos',
    text: 'Piirustusta ei tarvita. Valmistamme osan vaikka ruutupaperille piirretystä luonnoksesta – suunnittelemme ja mallinnamme sen ensin Autodesk Fusion 360 -ohjelmistolla.',
  },
  {
    id: 'malli',
    tab: '3D-malli',
    title: '3D-kuva tai valmis malli',
    text: 'Valmis 3D-malli tai -kuva siirtyy suoraan koneistukseen. Fusion 360 -ympäristössä mallia voidaan tarvittaessa muokata valmistettavaksi.',
  },
  {
    id: 'kappale',
    tab: 'Mallikappale',
    title: 'Vanha osa mallina',
    text: 'Yksittäisosat valmistuvat kuvilla tai ilman. Tuo mallikappale, niin valmistamme uuden osan sen pohjalta – myös korjauskoneistukset onnistuvat.',
  },
] as const

const work = [
  { t: 'Yksittäisosat', d: 'Kuvilla tai ilman – yhdestä kappaleesta alkaen.' },
  { t: 'Sopimusvalmistus', d: 'Osat ja tuotteet toistuvasti sovitun mukaan.' },
  { t: 'Sarjat', d: 'Yksittäisosista sarjatuotantoon.' },
  { t: 'Prototyypit', d: 'Ideasta koeteltavaksi kappaleeksi.' },
  { t: 'Korjauskoneistukset', d: 'Kuluneet ja vaurioituneet osat takaisin käyttöön.' },
  { t: 'Harrasteosat', d: 'Laidasta laitaan – myös yksityisasiakkaille.' },
]

export function ServiceCnc() {
  const [start, setStart] = useState<(typeof starts)[number]['id']>('luonnos')
  const current = starts.find((s) => s.id === start)!
  const machines = machineGroups.filter((g) => ['jyrsinta', 'sorvaus', 'hionta'].includes(g.id))

  return (
    <>
      <PageHero
        variant="bleed"
        crumbs={[
          { to: '/palvelut', label: 'Palvelut' },
          { to: '/palvelut/cnc-koneistus', label: 'CNC-koneistus' },
        ]}
        kicker="02 · CNC-koneistus"
        title="Tarkkaa koneistusta yhdestä osasta sarjaan."
        lead="Koneistamme 3- ja 5-akselisilla CNC-koneilla sekä suoritamme sorvaukset ja hionnat. Toteutetaan ideasi tarkasti ja tehokkaasti."
        image={{ slug: 'haas-vf2', alt: 'Haas VF-2YT -työstökeskus Sarolan verstaalla.', position: '50% 55%' }}
        caption="Haas VF-2YT-EU · 5-akselinen työstökeskus"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/yhteystiedot?palvelu=cnc#tarjouspyynto" className="btn btn-arc">
            Pyydä tarjous <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="#konekanta-cnc" className="btn btn-ghost">
            Konekanta
          </Link>
        </div>
      </PageHero>

      {/* Starting points – interactive */}
      <section aria-labelledby="lahtotiedot" className="bg-ink py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="label text-arc" data-reveal>
              Lähtötiedot
            </p>
            <h2 id="lahtotiedot" className="display-md mt-5 text-white" data-reveal>
              Mistä aloitetaan?
            </h2>
            <div role="tablist" aria-label="Lähtötiedot" className="mt-10 flex flex-wrap gap-2">
              {starts.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={start === s.id}
                  aria-controls="lahto-paneeli"
                  onClick={() => setStart(s.id)}
                  onKeyDown={(e) => {
                    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
                    const i = starts.findIndex((x) => x.id === start)
                    const n = starts[(i + (e.key === 'ArrowRight' ? 1 : starts.length - 1)) % starts.length]
                    setStart(n.id)
                    document.getElementById(`tab-${n.id}`)?.focus()
                  }}
                  tabIndex={start === s.id ? 0 : -1}
                  className={`min-h-[2.9rem] rounded-full border px-5 text-[0.95rem] font-semibold transition-colors ${
                    start === s.id ? 'border-arc bg-arc text-ink' : 'border-white/15 text-steel-300 hover:text-white'
                  }`}
                >
                  {s.tab}
                </button>
              ))}
            </div>
            <div id="lahto-paneeli" role="tabpanel" aria-labelledby={`tab-${start}`} className="mt-10 min-h-[11rem]">
              <h3 className="font-display text-[1.8rem] leading-tight text-white">{current.title}</h3>
              <p className="lead mt-4 text-steel-300">{current.text}</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[42rem]">
              {starts.map((s) => (
                <div
                  key={s.id}
                  aria-hidden={start !== s.id}
                  className={`oval absolute inset-0 overflow-hidden transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
                    start === s.id ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  }`}
                >
                  {s.id === 'luonnos' && <SketchGear className="h-full w-full" />}
                  {s.id === 'malli' && <Wireframe className="h-full w-full" />}
                  {s.id === 'kappale' && (
                    <Picture slug="hammaspyorat" alt="Viisi koneistettua teräksistä hammaspyörää työpöydällä." sizes="(min-width: 1024px) 50vw, 92vw" className="h-full w-full" />
                  )}
                </div>
              ))}
              <div aria-hidden className="pointer-events-none absolute -inset-3 rounded-[50%] border-[1.5px] border-arc/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Work types – editorial list */}
      <section aria-labelledby="tyot" className="brushed brushed-light bg-mirror py-24 text-ink sm:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="tyot" className="display-lg lg:col-span-7" data-reveal>
              Mitä koneistamme.
            </h2>
            <p className="lead text-steel-700 lg:col-span-5" data-reveal data-delay="0.08">
              Palvelemme yrityksiä ja yksityishenkilöitä – tuote- ja osavalmistuksesta harrasteosiin.
            </p>
          </div>
          <ul className="mt-14 grid border-t border-ink/12 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {work.map((w, i) => (
              <li key={w.t} className="border-b border-ink/12 py-8 sm:pr-10 lg:min-h-[12rem]">
                <span className="label text-arc-deep">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-[1.9rem] leading-none">{w.t}</h3>
                <p className="mt-3 text-steel-700">{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photo pair */}
      <section aria-label="Koneistettuja kappaleita" className="bg-ink py-24 sm:py-32">
        <div className="shell grid gap-6 md:grid-cols-12 md:items-end">
          <figure className="md:col-span-7" data-reveal="wipe">
            <Picture slug="hammaspyora-istukassa" alt="Teräksinen hammaspyörä kiinnitettynä istukkaan koneistusta varten." sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[4/3] overflow-hidden rounded-[2.2rem]" />
            <figcaption className="mt-3 flex justify-between text-sm text-steel-400">
              <span>Hammaspyörä istukassa</span>
              <span className="label text-steel-500">11/2022</span>
            </figcaption>
          </figure>
          <figure className="md:col-span-5" data-reveal="wipe" data-delay="0.12">
            <Picture slug="alumiinikappaleet-peili" alt="Kaksi alumiinikappaletta peilikiillotettuina reikäpöydällä." sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5] overflow-hidden rounded-[2.2rem]" />
            <figcaption className="mt-3 flex justify-between text-sm text-steel-400">
              <span>Peilipintaiset alumiinikappaleet</span>
              <span className="label text-steel-500">9/2024</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Machines */}
      <section id="konekanta-cnc" aria-labelledby="cnc-koneet" className="scroll-mt-24 bg-ink-2 py-24 sm:py-32">
        <div className="shell">
          <p className="label text-arc" data-reveal>
            Konekanta
          </p>
          <h2 id="cnc-koneet" className="display-md mt-5 max-w-[22ch] text-white" data-reveal>
            Jyrsintä, sorvaus ja hionta saman katon alla.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-3" data-reveal="stagger">
            {machines.map((g) => (
              <div key={g.id} className="bg-ink p-7 sm:p-9">
                <h3 className="label text-arc">{g.title}</h3>
                <ul className="mt-6 space-y-5">
                  {g.items.map((m) => (
                    <li key={m.name}>
                      <span className="block font-display text-[1.4rem] leading-tight text-white">{m.name}</span>
                      {m.detail && <span className="mt-1 block text-sm text-steel-400">{m.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link to="/yritys#konekanta" className="link-weld mt-10 inline-block font-semibold text-white">
            Koko konekanta
          </Link>
        </div>
      </section>

      <ContactCta title="Lähetä kuva, malli tai luonnos." topic="cnc" />
      <ServicePager current="cnc" />
    </>
  )
}
