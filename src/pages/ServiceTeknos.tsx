import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { TintRing } from '../components/art/TintRing'
import { ServicePager } from '../components/service/ServicePager'
import { ContactCta } from '../components/ui/ContactCta'
import { company } from '../data/company'
import { gsap, prefersReducedMotion, setupGsap } from '../lib/motion'

const checklist = [
  'Liike ja paikkakunta',
  'Sävytyskoneen malli',
  'Vian tai huoltotarpeen kuvaus',
  'Yhteyshenkilö ja paras tavoittamisaika',
]

export function ServiceTeknos() {
  const artRef = useRef<HTMLDivElement>(null)

  // The colorant carousel turns with scroll – a quiet, scroll-linked detail.
  useEffect(() => {
    if (prefersReducedMotion()) return
    setupGsap()
    const ctx = gsap.context(() => {
      gsap.to('[data-spin]', {
        rotate: 120,
        svgOrigin: '200 200',
        ease: 'none',
        scrollTrigger: { trigger: artRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, artRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <PageHero
        crumbs={[
          { to: '/palvelut', label: 'Palvelut' },
          { to: '/palvelut/teknos-savytyskoneet', label: 'Teknos-sävytyskoneet' },
        ]}
        kicker="05 · Teknos-sävytyskoneet"
        title={
          <>
            Itä-Suomesta <span className="italic text-arc">Lappiin.</span>
          </>
        }
        lead="Huollamme Teknos-sävytyskoneita Itä-Suomen ja Lapin alueella – jotta maalikaupan sävytys pysyy käynnissä."
        art={
          <div ref={artRef} className="h-full w-full">
            <TintRing className="h-full w-full" />
          </div>
        }
        caption="Havainnekuva · sävytyskoneen väriainekarusellit"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/yhteystiedot?palvelu=teknos#tarjouspyynto" className="btn btn-arc">
            Tilaa huolto <ArrowRight size={18} aria-hidden />
          </Link>
          <a href={company.phones[0].href} className="btn btn-ghost">
            Soita {company.phones[0].display}
          </a>
        </div>
      </PageHero>

      <section aria-labelledby="huoltopyynto" className="brushed brushed-light bg-mirror py-24 text-ink sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-arc-deep" data-reveal>
              Huoltopyyntö
            </p>
            <h2 id="huoltopyynto" className="display-md mt-5" data-reveal>
              Kerro nämä, niin pääsemme suoraan asiaan.
            </h2>
          </div>
          <ul className="space-y-3 lg:col-span-6 lg:col-start-7" data-reveal="stagger">
            {checklist.map((c, i) => (
              <li key={c} className="flex items-start gap-5 rounded-[1.6rem] border border-ink/10 bg-white p-6">
                <span className="grid h-9 w-14 shrink-0 place-items-center rounded-[50%] border-[1.5px] border-arc-deep/70 font-display text-ink">
                  {i + 1}
                </span>
                <span className="pt-1 text-[1.08rem]">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="kaksi-konetta" className="bg-ink py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="label text-arc" data-reveal>
              Rauta- ja maalikaupoille
            </p>
            <h2 id="kaksi-konetta" className="display-lg mt-5 text-white" data-reveal>
              Kaksi konetta, yksi huoltokumppani.
            </h2>
            <p className="lead mt-7 max-w-[36rem] text-steel-300" data-reveal data-delay="0.08">
              Huollamme saman katon alla sekä Teknos-sävytyskoneet että Abloy-avainjyrsinkoneet. Yksi puhelu riittää molempiin.
            </p>
          </div>
          <div className="space-y-3 lg:col-span-5" data-reveal="stagger">
            {[
              ['Teknos-sävytyskoneet', 'Huollot Itä-Suomessa ja Lapissa'],
              ['Abloy-avainjyrsinkoneet', 'Perus- ja täysihuollot, varaosat, sijaiskone'],
            ].map(([t, d]) => (
              <div key={t} className="flex items-center gap-5 rounded-[1.6rem] border border-white/10 bg-ink-2 p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-arc text-ink">
                  <Check size={18} strokeWidth={2.6} aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-xl text-white">{t}</span>
                  <span className="mt-1 block text-sm text-steel-400">{d}</span>
                </span>
              </div>
            ))}
            <Link to="/palvelut/abloy-avainjyrsinkoneet" className="link-weld mt-4 inline-flex items-center gap-2 font-semibold text-white">
              Abloy-huollot <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <ContactCta title="Sävytyskone huoltoon?" topic="teknos" />
      <ServicePager current="teknos" />
    </>
  )
}
