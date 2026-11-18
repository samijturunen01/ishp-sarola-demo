import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { GritScale } from '../components/service/GritScale'
import { Picture } from '../components/ui/Picture'
import { ContactCta } from '../components/ui/ContactCta'
import { KeyProfile } from '../components/art/KeyProfile'
import { abloyDocs } from '../data/abloy'

export function Products() {
  return (
    <>
      <PageHero
        variant="type"
        crumbs={[{ to: '/tuotteet', label: 'Tuotteet' }]}
        kicker="Tuotteet"
        title={
          <>
            Omaa valmistusta – <span className="text-mirror italic [--sheen:55]">liuskasta varaosaan.</span>
          </>
        }
        lead="Valmistamme Tuvel-hiomaliuskoja, myymme ja valmistamme Abloy-avainjyrsinkoneiden varaosia sekä tarjoamme Sento-avainkoneita."
      />

      {/* Tuvel */}
      <section aria-labelledby="tuvel" className="brushed brushed-light bg-mirror py-24 text-ink sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="label text-arc-deep" data-reveal>
              Tuvel-hiomaliuskat
            </p>
            <h2 id="tuvel" className="display-lg mt-5" data-reveal>
              P120–P2000.
            </h2>
            <div className="prose-sarola lead mt-7 text-steel-700" data-reveal data-delay="0.08">
              <p>Valmistamme Tuvel-hiomaliuskoja karkeuksilla P120–P2000.</p>
              <p>
                Liuskoja käytetään käsihiontaan erityisesti muottiteollisuudessa – ne käyvät mainiosti myös askarteluun ja
                autotalliin.
              </p>
            </div>
            <Link to="/yhteystiedot?palvelu=tuvel#tarjouspyynto" className="btn btn-dark mt-9" data-reveal>
              Kysy hiomaliuskoja <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <GritScale />
          </div>
        </div>
      </section>

      {/* Abloy parts */}
      <section aria-labelledby="varaosat-t" className="bg-ink py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="order-2 lg:order-1 lg:col-span-6" data-reveal="oval">
            <Picture
              slug="avainjyrsinkone-huollossa"
              alt="Avainjyrsinkoneen osat työpöydällä huollon aikana."
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="oval aspect-[5/4] overflow-hidden"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <p className="label text-arc" data-reveal>
              Abloy-varaosat
            </p>
            <h2 id="varaosat-t" className="display-md mt-5 text-white" data-reveal>
              Varaosat avainjyrsinkoneisiin.
            </h2>
            <p className="mt-6 text-steel-300" data-reveal data-delay="0.08">
              Classic-, Profile- ja Exec-koneiden osat sekä AVA-koneiden varaosat tilauksesta valmistettuina. Osat ja tilauskoodit
              löytyvät varaosaluettelosta.
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <a href={abloyDocs[0].href} target="_blank" rel="noopener" className="btn btn-arc">
                <Download size={18} aria-hidden /> Varaosaluettelo (PDF)
              </a>
              <Link to="/palvelut/abloy-avainjyrsinkoneet" className="btn btn-ghost">
                Huollot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sento */}
      <section aria-labelledby="sento" className="bg-ink-2 py-24 sm:py-28">
        <div className="shell">
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[2.4rem] border border-white/10 p-8 sm:p-14 lg:grid-cols-12 lg:gap-8">
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-28 -z-0 h-[30rem] w-[44rem] rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_98_41/0.10),transparent)]" />
            <div className="relative lg:col-span-5">
              <p className="label text-arc" data-reveal>
                Avainkoneet
              </p>
              <h2 id="sento" className="display-md mt-5 max-w-[18ch] text-white" data-reveal>
                Sento-avainkoneet kotimaisella laadulla.
              </h2>
              <p className="mt-5 max-w-xl text-steel-300" data-reveal data-delay="0.08">
                Avainkoneiden myynti, huolto ja varaosat samasta paikasta. Kysy lisää Sento-avainkoneista.
              </p>
              <Link to="/yhteystiedot?palvelu=sento#tarjouspyynto" className="btn btn-ghost mt-8">
                Kysy Sento-avainkoneista <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
            <div className="relative -mx-4 sm:mx-0 lg:col-span-7" data-reveal="fade">
              <KeyProfile className="mx-auto block h-auto w-full max-w-[40rem]" />
            </div>
          </div>
        </div>
      </section>

      <ContactCta topic="tuvel" />
    </>
  )
}
