import type { ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone, Receipt } from 'lucide-react'
import { Breadcrumbs } from '../components/ui/PageHero'
import { InquiryForm } from '../components/forms/InquiryForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { company } from '../data/company'

export function Contact() {
  const [params] = useSearchParams()
  return (
    <>
      <section className="brushed relative isolate overflow-hidden bg-ink pb-16 pt-28 [--brushed-opacity:0.07] sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute -left-[20vw] top-[18%] -z-10 aspect-[228/90] w-[80vw] rounded-[50%] border-[1.5px] border-arc/30" />
        <div className="shell">
          <Breadcrumbs items={[{ to: '/yhteystiedot', label: 'Yhteystiedot' }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-arc">Yhteystiedot</p>
              <h1 className="display-xl mt-5 text-white">
                Soita, kirjoita <span className="text-mirror italic [--sheen:55]">tai tule käymään.</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <a href={company.phones[0].href} className="group block">
                <span className="label text-steel-500">Puhelin</span>
                <span className="mt-2 block font-display text-[clamp(2.4rem,5vw,4rem)] leading-none text-white transition-colors group-hover:text-arc-hot">
                  {company.phones[0].display}
                </span>
              </a>
              <a href={`mailto:${company.email}`} className="link-weld mt-5 inline-block text-xl text-white">
                {company.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Yhteystiedot ja tarjouspyyntö" className="bg-ink pb-24 sm:pb-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4">
            <InfoCard icon={<Phone size={20} aria-hidden />} title="Puhelin">
              {company.phones.map((p) => (
                <a key={p.href} href={p.href} className="link-weld block w-fit text-lg text-white">
                  {p.display}
                </a>
              ))}
            </InfoCard>
            <InfoCard icon={<Mail size={20} aria-hidden />} title="Sähköposti">
              <a href={`mailto:${company.email}`} className="link-weld text-lg text-white">
                {company.email}
              </a>
            </InfoCard>
            <InfoCard icon={<MapPin size={20} aria-hidden />} title="Käyntiosoite">
              <address className="not-italic text-white">
                {company.name}
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </address>
            </InfoCard>
            <InfoCard icon={<Clock size={20} aria-hidden />} title="Aukioloajat">
              <dl className="space-y-1">
                {company.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6">
                    <dt className="text-steel-400">{h.days}</dt>
                    <dd className="text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </InfoCard>
            <InfoCard icon={<Receipt size={20} aria-hidden />} title="Laskutus">
              <dl className="space-y-1 text-sm">
                {[
                  ['Y-tunnus', company.businessId],
                  ['Verkkolaskuosoite', company.einvoice.address],
                  ['Operaattoritunnus', company.einvoice.operatorId],
                  ['Operaattori', company.einvoice.operator],
                ].map(([k, val]) => (
                  <div key={k} className="flex flex-wrap justify-between gap-x-6">
                    <dt className="text-steel-400">{k}</dt>
                    <dd className="font-mono text-white">{val}</dd>
                  </div>
                ))}
              </dl>
            </InfoCard>
          </aside>

          <div id="tarjouspyynto" className="scroll-mt-24 lg:col-span-8">
            <h2 className="display-md text-white">Tarjous- tai huoltopyyntö</h2>
            <p className="mt-4 max-w-xl text-steel-300">
              Ota yhteyttä lomakkeella, niin palaamme asiaan mahdollisimman pian. Valitse palvelu, niin lomake kysyy olennaiset
              tiedot.
            </p>
            <div className="mt-8">
              <InquiryForm key={params.get('palvelu') ?? 'none'} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="kartta" className="bg-ink-2 py-24 sm:py-28">
        <div className="shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-arc">Sijainti</p>
              <h2 id="kartta" className="display-md mt-4 text-white">
                Käpykankaan teollisuusalueella.
              </h2>
            </div>
            <p className="max-w-sm text-steel-400">
              {company.address.street}, {company.address.postalCode} {company.address.city}. Verstaan seinässä on ISHP.FI-kyltti.
            </p>
          </div>
          <MapEmbed />
        </div>
      </section>
    </>
  )
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-ink-2 p-6">
      <p className="label flex items-center gap-3 text-steel-400">
        <span className="grid h-9 w-12 place-items-center rounded-[50%] border-[1.5px] border-arc/70 text-arc">{icon}</span>
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  )
}
