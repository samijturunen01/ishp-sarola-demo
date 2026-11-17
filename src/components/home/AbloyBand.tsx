import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { abloyTiers } from '../../data/abloy'
import { Picture } from '../ui/Picture'

/** Key-tag shaped price tags – the B2B core offer, lifted out of the old PDF. */
export function KeyTag({ tier, dark = false }: { tier: (typeof abloyTiers)[number]; dark?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.6rem_4.5rem_4.5rem_1.6rem] p-7 pl-16 sm:p-8 sm:pl-20 ${
        dark ? 'bg-ink text-white' : 'border border-ink/12 bg-white text-ink'
      }`}
    >
      {/* the tag's ring hole */}
      <span
        aria-hidden
        className={`absolute left-6 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-[1.5px] sm:left-7 ${
          dark ? 'border-arc bg-ink-3' : 'border-arc-deep/70 bg-mirror'
        }`}
      />
      <p className={`label ${dark ? 'text-arc' : 'text-arc-deep'}`}>{tier.name}</p>
      <p className="mt-3 font-display text-[2.6rem] leading-none tracking-tight sm:text-5xl">
        {tier.price} <span className={`font-sans text-base tracking-normal ${dark ? 'text-steel-400' : 'text-steel-600'}`}>alv 0 %</span>
      </p>
      <p className={`mt-2 text-sm ${dark ? 'text-steel-400' : 'text-steel-600'}`}>{tier.plus}</p>
    </div>
  )
}

export function AbloyBand() {
  return (
    <section aria-labelledby="abloy-otsikko" className="brushed brushed-light relative overflow-hidden bg-mirror py-24 text-ink sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="label text-arc-deep" data-reveal>
            Abloy-avainjyrsinkoneet
          </p>
          <h2 id="abloy-otsikko" className="display-lg mt-5" data-reveal>
            Avainkone takaisin tarkkuuteensa.
          </h2>
          <p className="lead mt-7 max-w-[34rem] text-steel-700" data-reveal data-delay="0.08">
            Huollamme Abloy-avainjyrsinkoneet, myymme ja valmistamme niihin varaosia. Jokaisella huolletulla koneella tehdään
            koeavaimet, jotka luetaan indikaattorilla ja testataan lukolla.
          </p>
          <p className="mt-5 max-w-[34rem] text-steel-700" data-reveal data-delay="0.12">
            Tarvittaessa saat huollon ajaksi <strong className="font-semibold text-ink">sijaiskoneen pelkillä rahtikuluilla</strong> –
            avainpalvelu ei katkea.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal data-delay="0.16">
            <Link to="/palvelut/abloy-avainjyrsinkoneet" className="btn btn-dark">
              Huollot ja varaosat <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/yhteystiedot?palvelu=abloy#tarjouspyynto" className="btn btn-outline-dark">
              Tilaa huolto
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="oval relative mx-auto aspect-[6/5] w-[88%] overflow-hidden lg:ml-auto lg:mr-0" data-reveal="oval">
            <Picture
              slug="avainjyrsinkone-huollossa"
              alt="Avainjyrsinkone purettuna huoltoa varten: moottori, terä, avainistukka ja syöttövipu työpöydällä."
              sizes="(min-width: 1024px) 44vw, 88vw"
              className="h-full w-full"
            />
          </div>
          <div className="relative -mt-16 grid gap-3 sm:-mt-20 sm:grid-cols-2 lg:-ml-16 lg:mr-10" data-reveal="stagger">
            <KeyTag tier={abloyTiers[0]} />
            <KeyTag tier={abloyTiers[1]} dark />
          </div>
        </div>
      </div>
    </section>
  )
}
