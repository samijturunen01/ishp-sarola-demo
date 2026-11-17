import { useId } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { ServicePager } from '../components/service/ServicePager'
import { ContactCta } from '../components/ui/ContactCta'
import { galleryBySlug } from '../data/gallery'
import { machineGroups } from '../data/machines'
import type { ImageSlug } from '../data/imageManifest'

// Abstract metal swatches – graphic representations, not photographs.
const materials = [
  { name: 'Alumiini', abbr: 'AL', bg: 'linear-gradient(135deg,#d9dde1 0%,#f4f5f6 38%,#b9bfc6 62%,#e6e8ea 100%)', ink: '#0b0c0e' },
  { name: 'Rosteri', abbr: 'RST', bg: 'linear-gradient(135deg,#9aa1a9 0%,#cfd3d8 40%,#8a9098 70%,#b6bbc1 100%)', ink: '#0b0c0e' },
  { name: 'Hapokas', abbr: 'HST', bg: 'linear-gradient(135deg,#6f767e 0%,#a7adb4 45%,#5d636b 75%,#8d939b 100%)', ink: '#0b0c0e' },
  { name: 'Erikoismateriaalit', abbr: '+', bg: 'linear-gradient(135deg,#2f343a 0%,#4a5058 45%,#24282d 100%)', ink: '#ffffff' },
]

const sequence: ImageSlug[] = ['vetolaite-vaurio', 'vetolaite-hitsattu', 'vetolaite-pohjamaali', 'vetolaite-maalaus', 'vetolaite-valmis', 'vetolaitteet-valmiit']

/** A stylised TIG bead ("stacked dimes") drawn across each swatch. */
function Bead() {
  const id = `bead-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-10 w-full -translate-y-1/2" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#c9a24a" stopOpacity=".0" />
          <stop offset=".2" stopColor="#c9a24a" stopOpacity=".55" />
          <stop offset=".5" stopColor="#6b5aa8" stopOpacity=".45" />
          <stop offset=".8" stopColor="#3f7fb0" stopOpacity=".45" />
          <stop offset="1" stopColor="#3f7fb0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="6" width="300" height="28" fill={`url(#${id})`} className="transition-opacity duration-500 group-hover:opacity-100" opacity=".55" />
      {Array.from({ length: 24 }, (_, i) => (
        <ellipse key={i} cx={8 + i * 12.2} cy="20" rx="9" ry="11" fill="none" stroke="rgb(0 0 0 / .35)" strokeWidth="1.1" />
      ))}
    </svg>
  )
}

export function ServiceWelding() {
  const weldingKit = machineGroups.find((g) => g.id === 'hitsaus')!
  return (
    <>
      <PageHero
        variant="type"
        crumbs={[
          { to: '/palvelut', label: 'Palvelut' },
          { to: '/palvelut/tig-hitsaus', label: 'TIG-hitsaus & kokoonpano' },
        ]}
        kicker="03 · TIG-hitsaus & kokoonpano"
        title={
          <>
            Siisti jälki. <span className="text-mirror italic [--sheen:60]">Vahva lopputulos.</span>
          </>
        }
        lead="TIG-hitsausta tarkkuudella ja viimeistelyllä – alumiinille, rosterille, hapokkaille ja erikoismateriaaleille. Lisäksi automaatio- ja kokoonpanotyöt tarkasti, siististi ja aikataulussa."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/yhteystiedot?palvelu=hitsaus#tarjouspyynto" className="btn btn-arc">
            Pyydä tarjous <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="#tyovaiheet" className="btn btn-ghost">
            Katso työvaiheet
          </Link>
        </div>
      </PageHero>

      <section aria-label="Valmiit vetolaitteet" className="bg-ink">
        <div className="shell">
          <figure data-reveal="wipe">
            <Picture
              slug="vetolaitteet-valmiit"
              alt="Musta ja hopeanvärinen perävetolaitteen alaosa valmiina telineissä verstaalla."
              sizes="100vw"
              className="aspect-[16/10] overflow-hidden rounded-[2.4rem] sm:aspect-[21/9]"
              position="50% 45%"
            />
          </figure>
        </div>
      </section>

      {/* Materials */}
      <section aria-labelledby="materiaalit" className="bg-ink py-24 sm:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-arc" data-reveal>
                Materiaalit
              </p>
              <h2 id="materiaalit" className="display-md mt-5 text-white" data-reveal>
                Alumiinista erikoismateriaaleihin.
              </h2>
            </div>
            <p className="text-steel-400 lg:col-span-5" data-reveal data-delay="0.08">
              Hitsaukset alumiinille, rosterille (RST), hapokkaille (HST) ja erikoismateriaaleille – siisti jälki, vahva lopputulos.
            </p>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-reveal="stagger">
            {materials.map((m) => (
              <li key={m.name} className="group relative aspect-[3/4] overflow-hidden rounded-[1.6rem] p-5 sm:aspect-[4/5] sm:rounded-[2rem] sm:p-6" style={{ background: m.bg, color: m.ink }}>
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{ background: 'repeating-linear-gradient(90deg, rgb(255 255 255 / .35) 0 1px, transparent 1px 3px)' }}
                />
                <Bead />
                <span className="label relative">{m.abbr}</span>
                <h3 className="absolute bottom-5 left-5 right-5 font-display text-[1.3rem] leading-none [overflow-wrap:anywhere] sm:bottom-6 sm:left-6 sm:right-6 sm:text-[1.9rem]">{m.name}</h3>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-steel-500">Havainnekuvat materiaaleista – eivät valokuvia.</p>
        </div>
      </section>

      {/* Work sequence from the gallery */}
      <section id="tyovaiheet" aria-labelledby="vaiheet-otsikko" className="scroll-mt-20 bg-ink-2 py-24 sm:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-arc" data-reveal>
                Galleriasta · syyskuu 2024
              </p>
              <h2 id="vaiheet-otsikko" className="display-md mt-5 text-white" data-reveal>
                Vetolaitteiden korjauksia vaihe vaiheelta.
              </h2>
            </div>
            <p className="text-steel-400 lg:col-span-5" data-reveal data-delay="0.08">
              Kuvat ovat yrityksen omasta galleriasta kuvausjärjestyksessä – vaurioituneesta evästä valmiiseen pintaan.
            </p>
          </div>
        </div>
        <ol
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc((100vw-92rem)/2+3.5rem))] pb-6 [scrollbar-color:#ff6229_transparent] [scrollbar-width:thin]"
          aria-label="Työvaiheet"
          tabIndex={0}
        >
          {sequence.map((slug, i) => {
            const g = galleryBySlug(slug)!
            return (
              <li key={slug} className="w-[78vw] shrink-0 snap-start sm:w-[24rem]">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-14 place-items-center rounded-[50%] border-[1.5px] border-arc font-display text-white">{i + 1}</span>
                  <span className="h-px flex-1 bg-white/12" />
                  <span className="label text-steel-500">{g.date}</span>
                </div>
                <Picture slug={slug} alt={g.alt} sizes="(min-width: 640px) 24rem, 78vw" className="mt-5 aspect-[4/5] overflow-hidden rounded-[1.8rem]" />
                <p className="mt-4 font-display text-xl text-white">{g.title}</p>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Assembly + equipment */}
      <section aria-labelledby="kokoonpano" className="brushed brushed-light bg-mirror py-24 text-ink sm:py-32">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-arc-deep" data-reveal>
              Automaatio- ja kokoonpanotyöt
            </p>
            <h2 id="kokoonpano" className="display-lg mt-5" data-reveal>
              Komponentista valmiiksi moduuliksi.
            </h2>
            <p className="lead mt-7 max-w-[36rem] text-steel-700" data-reveal data-delay="0.08">
              Automaatio- ja kokoonpanotyöt tarkasti, siististi ja aikataulussa. Yksittäiset komponentit tai kokonaiset moduulit –
              kokoamme ne valmiiksi toimintaan.
            </p>
            <Link to="/yhteystiedot?palvelu=kokoonpano#tarjouspyynto" className="btn btn-dark mt-9" data-reveal>
              Kysy kokoonpanotyöstä
            </Link>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="label text-steel-600">Hitsauslaitteet</h3>
            <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10" data-reveal="stagger">
              {weldingKit.items.map((m) => (
                <li key={m.name} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="font-display text-[1.35rem]">{m.name}</span>
                  <span className="text-sm text-steel-600">{m.detail}</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 py-4">
                <span className="font-display text-[1.35rem]">Lasikuulapuhallus</span>
                <span className="text-sm text-steel-600">Puhalluskaappi</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ContactCta title="Mitä hitsataan?" topic="hitsaus" />
      <ServicePager current="hitsaus" />
    </>
  )
}
