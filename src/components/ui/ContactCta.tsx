import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { company } from '../../data/company'
import type { FormTopic } from '../../data/services'

interface Props {
  title?: string
  topic?: FormTopic
}

/** Closing call to action used on every page – the phone number is the hero. */
export function ContactCta({ title = 'Kerro, mitä pitää tehdä.', topic }: Props) {
  const formHref = `/yhteystiedot${topic ? `?palvelu=${topic}` : ''}#tarjouspyynto`
  return (
    <section aria-labelledby="cta-otsikko" className="brushed relative isolate overflow-hidden bg-ink py-24 sm:py-36 [--brushed-opacity:0.06]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-[228/90] w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-[1.5px] border-arc/25 sm:w-[110vw]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-[228/90] w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_98_41/0.12),transparent)]"
      />
      <div className="shell text-center">
        <p className="label text-arc" data-reveal>
          Ota yhteyttä
        </p>
        <h2 id="cta-otsikko" className="display-lg mx-auto mt-6 max-w-[16ch] text-white" data-reveal>
          {title}
        </h2>
        <a
          href={company.phones[0].href}
          className="text-mirror mt-10 inline-block font-display text-[clamp(2.6rem,9vw,8rem)] font-[640] leading-none tracking-[-0.03em] [--sheen:50] hover:[--sheen:80]"
          data-reveal
          data-delay="0.08"
        >
          {company.phones[0].display}
        </a>
        <div className="mt-12 flex flex-wrap justify-center gap-3" data-reveal data-delay="0.12">
          <Link to={formHref} className="btn btn-arc">
            Lähetä tarjouspyyntö <ArrowRight size={18} aria-hidden />
          </Link>
          <a href={`mailto:${company.email}`} className="btn btn-ghost">
            <Mail size={17} aria-hidden className="text-arc" /> {company.email}
          </a>
        </div>
        <p className="mt-10 inline-flex items-center gap-2 text-steel-400" data-reveal data-delay="0.16">
          <MapPin size={16} aria-hidden className="text-arc" />
          {company.address.street}, {company.address.postalCode} {company.address.city}
        </p>
      </div>
    </section>
  )
}
