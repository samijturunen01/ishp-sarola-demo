import { Link } from 'react-router-dom'
import { ArrowRight, Download, FileText, Truck } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { AbloyCompare } from '../components/service/AbloyCompare'
import { ServicePager } from '../components/service/ServicePager'
import { Accordion } from '../components/ui/Accordion'
import { ContactCta } from '../components/ui/ContactCta'
import { abloyDocs, abloyMachineNumbers, abloyModels } from '../data/abloy'
import { company } from '../data/company'

const steps = [
  { t: 'Yhteydenotto', d: 'Kerro konemalli ja vika puhelimitse, sähköpostitse tai lomakkeella. Tarvittaessa sovimme sijaiskoneesta.' },
  { t: 'Purku ja pesu', d: 'Kone puretaan ja pestään, ja osien kuluneisuus tarkastetaan.' },
  { t: 'Osat ja kalibrointi', d: 'Kuluneet osat uusitaan ja kone kalibroidaan. Täysihuollossa myös moottorin laakerit ja maalaus.' },
  { t: 'Koeavaimet', d: 'Koneella tehdään koeavaimet, jotka luetaan indikaattorilla ja testataan lukolla.' },
  { t: 'Raportti ja palautus', d: 'Saat huoltoraportin tehdystä työstä ja uusituista osista.' },
]

const faq = [
  {
    q: 'Saanko koneen huollon ajaksi?',
    a: 'Kyllä. Tarvittaessa saat huollon ajaksi käyttöösi sijaiskoneen pelkillä rahtikuluilla. Sijaiskoneita on Classic-, Profile- ja Exec-koneisiin.',
  },
  {
    q: 'Mitä perushuollon ja täysihuollon ero on?',
    a: 'Perushuolto sisältää purun, pesun, kuluneiden osien tarkastuksen ja uusimisen sekä kalibroinnin. Täysihuollossa lisäksi sähkömoottori puretaan, laakerit vaihdetaan ja kone maalataan uudelleen.',
  },
  {
    q: 'Miten varmistatte, että kone toimii huollon jälkeen?',
    a: 'Jokaisella huolletulla koneella tehdään koeavaimet, jotka luetaan indikaattorilla ja testataan lukolla. Lisäksi saat huoltoraportin tehdystä työstä ja uusituista osista.',
  },
  {
    q: 'Saako varaosia myös ilman huoltoa?',
    a: 'Kyllä. Myymme varaosia Abloy-avainjyrsinkoneisiin, ja AVA-koneiden varaosia valmistamme tilauksesta. Katso osat ja tilauskoodit varaosaluettelosta tai kysy suoraan.',
  },
]

export function ServiceAbloy() {
  return (
    <>
      <PageHero
        crumbs={[
          { to: '/palvelut', label: 'Palvelut' },
          { to: '/palvelut/abloy-avainjyrsinkoneet', label: 'Abloy-avainjyrsinkoneet' },
        ]}
        kicker="01 · Abloy-avainjyrsinkoneet"
        title={
          <>
            Avainkone takaisin <em className="text-mirror not-italic [--sheen:55]">tarkkuuteensa.</em>
          </>
        }
        lead="Huollamme Abloy-avainjyrsinkoneet sekä myymme ja valmistamme niihin varaosia. Jokainen huollettu kone testataan koeavaimilla ennen palautusta."
        image={{
          slug: 'avainjyrsinkone-huollossa',
          alt: 'Avainjyrsinkone purettuna huoltoa varten: moottori, terä, avainistukka ja syöttövipu työpöydällä.',
        }}
        caption="Avainjyrsinkone huollossa · 9/2022"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/yhteystiedot?palvelu=abloy#tarjouspyynto" className="btn btn-arc">
            Tilaa huolto <ArrowRight size={18} aria-hidden />
          </Link>
          <a href={company.phones[0].href} className="btn btn-ghost">
            Soita {company.phones[0].display}
          </a>
        </div>
        <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-6">
          <div>
            <dt className="label text-steel-500">Mallit</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {abloyModels.map((m) => (
                <span key={m} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white">
                  {m}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="label text-steel-500">Koneet</dt>
            <dd className="mt-2 font-mono text-sm leading-relaxed text-steel-200">{abloyMachineNumbers.join(' · ')}</dd>
          </div>
        </dl>
      </PageHero>

      {/* Service levels */}
      <section aria-labelledby="huoltotasot" className="brushed brushed-light bg-mirror py-24 text-ink sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-arc-deep" data-reveal>
              Huoltotasot
            </p>
            <h2 id="huoltotasot" className="display-md mt-5" data-reveal>
              Perushuolto vai täysihuolto?
            </h2>
            <p className="mt-6 text-steel-700" data-reveal data-delay="0.08">
              Molemmissa kone puretaan, pestään, kalibroidaan ja testataan koeavaimilla. Täysihuolto palauttaa koneen myös
              sähkömoottorin laakereiden ja pinnan osalta.
            </p>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <AbloyCompare />
          </div>
        </div>
      </section>

      {/* Loan machine band */}
      <section aria-labelledby="sijaiskone" className="relative overflow-hidden bg-arc py-16 text-ink sm:py-20">
        <div className="shell grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
          <span className="grid h-20 w-28 place-items-center rounded-[50%] border-[1.5px] border-ink">
            <Truck size={30} aria-hidden />
          </span>
          <div>
            <h2 id="sijaiskone" className="font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-tight">
              Avainpalvelu ei katkea huollon ajaksi.
            </h2>
            <p className="mt-3 max-w-2xl text-[1.05rem] text-ink/80">
              Tarvittaessa saat käyttöösi sijaiskoneen pelkillä rahtikuluilla – Classic, Profile ja Exec.
            </p>
          </div>
          <Link to="/yhteystiedot?palvelu=abloy#tarjouspyynto" className="btn btn-dark w-fit">
            Kysy sijaiskonetta
          </Link>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="huollon-kulku" className="bg-ink py-24 sm:py-32">
        <div className="shell">
          <p className="label text-arc" data-reveal>
            Huollon kulku
          </p>
          <h2 id="huollon-kulku" className="display-md mt-5 max-w-[20ch] text-white" data-reveal>
            Viisi vaihetta kalibroituun koneeseen.
          </h2>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-5" data-reveal="stagger">
            {steps.map((s, i) => (
              <li key={s.t} className="relative bg-ink-2 p-7 lg:min-h-[19rem]">
                <span className="grid h-12 w-[4.5rem] place-items-center rounded-[50%] border-[1.5px] border-arc font-display text-xl text-white">
                  {i + 1}
                </span>
                <h3 className="mt-7 font-display text-[1.45rem] text-white">{s.t}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-steel-400">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Spare parts + downloads */}
      <section aria-labelledby="varaosat" className="bg-ink-2 py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <p className="label text-arc" data-reveal>
              Varaosat
            </p>
            <h2 id="varaosat" className="display-md mt-5 text-white" data-reveal>
              Varaosat myynnistä – ja tilauksesta valmistettuina.
            </h2>
            <div className="prose-sarola mt-6 text-steel-300" data-reveal data-delay="0.08">
              <p>
                Myymme varaosia Abloy-avainjyrsinkoneisiin: teriä, avainistukoita, luisteja, laakereita, jousia ja
                indikaattoreita. Exec-koneiden osat toimitetaan toistaiseksi tilauksesta, ja AVA-koneiden varaosia valmistamme
                tilauksesta omalla konekannallamme.
              </p>
              <p>
                Lisäksi tarjoamme <strong className="font-semibold text-white">Sento-avainkoneita kotimaisella laadulla</strong> –
                kysy lisää.
              </p>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-6 lg:col-start-7" data-reveal="stagger">
            {abloyDocs.map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 rounded-[1.8rem] border border-white/10 bg-ink p-5 transition-colors hover:border-arc sm:gap-6 sm:p-8"
              >
                <span className="grid h-12 w-14 shrink-0 place-items-center rounded-[50%] bg-ink-3 text-arc sm:h-16 sm:w-20">
                  <FileText size={26} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.15rem] leading-snug text-white [overflow-wrap:anywhere] sm:text-[1.35rem]">{d.title}</span>
                  <span className="label mt-2 block text-steel-500">{d.meta}</span>
                </span>
                <Download size={20} aria-hidden className="shrink-0 text-steel-400 transition-transform group-hover:translate-y-0.5 group-hover:text-arc" />
              </a>
            ))}
            <p className="pl-2 text-sm text-steel-500">Varaosaluettelon hinnat ovat alv 0 %. Hintoihin lisätään todelliset rahtikustannukset.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="abloy-ukk" className="bg-mirror-2 py-24 text-ink sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-arc-deep">Usein kysyttyä</p>
            <h2 id="abloy-ukk" className="display-md mt-5">
              Ennen kuin lähetät koneen.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      <ContactCta title="Avainkone huoltoon?" topic="abloy" />
      <ServicePager current="abloy" />
    </>
  )
}
