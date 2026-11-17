import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { ContactCta } from '../components/ui/ContactCta'
import { company } from '../data/company'
import { machineCount, machineGroups } from '../data/machines'
import { asset } from '../lib/asset'

const principles = [
  {
    t: 'Moniosaaminen',
    d: 'Koneistus, hitsaus, kiillotus, merkintä, kokoonpano ja konehuollot saman katon alla.',
  },
  {
    t: 'Laaja yhteistyöverkosto',
    d: 'Asiakas saa tarvitsemansa palvelut yhdellä puhelinsoitolla – myös silloin, kun työ vaatii kumppania.',
  },
  {
    t: 'Jatkuva kehittäminen',
    d: 'Meille on tärkeää parantaa ja kehittää toimintaamme jatkuvasti asiakastarpeiden mukaan.',
  },
]

export function Company() {
  return (
    <>
      <PageHero
        variant="bleed"
        crumbs={[{ to: '/yritys', label: 'Yritys' }]}
        kicker="Yritys"
        title={
          <>
            Käpykankaalla vuodesta <span className="text-arc">{company.founded}.</span>
          </>
        }
        lead={`Olemme vuonna ${company.founded} perustettu teollisuusalan yritys. Toimimme ${company.premisesM2} m²:n tiloissa Joensuun Käpykankaalla.`}
        image={{ slug: 'verstas-lylykoskentie', alt: 'Sarolan verstasrakennus Lylykoskentie 31:ssä, seinässä ISHP.FI-kyltti.', position: '40% 40%' }}
        caption={`${company.address.street}, ${company.address.postalCode} ${company.address.city}`}
      />

      {/* Facts */}
      <section aria-label="Yritys lukuina" className="border-b border-white/10 bg-ink">
        <dl className="shell grid grid-cols-2 lg:grid-cols-4">
          {[
            [String(company.founded), 'perustettu'],
            [`${company.premisesM2} m²`, 'tilat Käpykankaalla'],
            [String(machineCount), 'laitetta konekannassa'],
            ['2', 'konehuoltoa: Abloy ja Teknos'],
          ].map(([v, k], i) => (
            <div key={k} className={`flex flex-col py-10 sm:py-14 ${i % 2 === 1 ? 'pl-6 sm:pl-10' : ''} ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-10' : ''}`}>
              <dt className="label order-2 mt-3 text-steel-500">{k}</dt>
              <dd className="order-1 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Principles */}
      <section aria-labelledby="vahvuudet" className="bg-ink py-24 sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-arc" data-reveal>
              Vahvuudet
            </p>
            <h2 id="vahvuudet" className="display-md mt-5 text-white" data-reveal>
              Yksi soitto riittää.
            </h2>
          </div>
          <ol className="lg:col-span-8" data-reveal="stagger">
            {principles.map((p, i) => (
              <li key={p.t} className="grid gap-4 border-t border-white/10 py-9 sm:grid-cols-[5rem_1fr]">
                <span className="grid h-11 w-16 place-items-center rounded-[50%] border-[1.5px] border-arc font-display text-lg text-white">{i + 1}</span>
                <div>
                  <h3 className="font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight text-white">{p.t}</h3>
                  <p className="mt-3 max-w-xl text-[1.05rem] text-steel-300">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Machine park */}
      <section id="konekanta" aria-labelledby="konekanta-h" className="scroll-mt-20 brushed brushed-light bg-mirror py-24 text-ink sm:py-32">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-arc-deep" data-reveal>
                Konekanta
              </p>
              <h2 id="konekanta-h" className="display-lg mt-5" data-reveal>
                {machineCount} laitetta. Yksi verstas.
              </h2>
            </div>
            <div className="lg:col-span-5" data-reveal>
              <Picture slug="haas-vf2" alt="Haas VF-2YT -työstökeskus verstaalla." sizes="(min-width: 1024px) 36vw, 92vw" className="oval aspect-[5/4] overflow-hidden" />
            </div>
          </div>

          <div className="mt-16 overflow-hidden rounded-[2rem] border border-ink/12 bg-white">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Sarolan konekanta prosesseittain</caption>
              <thead className="hidden sm:table-header-group">
                <tr className="border-b border-ink/10">
                  <th scope="col" className="label w-[26%] p-6 text-steel-600">
                    Prosessi
                  </th>
                  <th scope="col" className="label p-6 text-steel-600">
                    Kone
                  </th>
                  <th scope="col" className="label p-6 text-steel-600">
                    Tyyppi
                  </th>
                </tr>
              </thead>
              <tbody>
                {machineGroups.map((g) =>
                  g.items.map((m, i) => (
                    <tr key={m.name} className={`${i === 0 ? 'border-t-2 border-ink/10' : 'border-t border-ink/6'} flex flex-wrap sm:table-row`}>
                      {i === 0 ? (
                        <th
                          scope="rowgroup"
                          rowSpan={g.items.length}
                          className="label w-full bg-mirror-2 px-6 pb-1 pt-5 align-top text-arc-deep sm:w-auto sm:bg-transparent sm:py-5"
                        >
                          {g.title}
                        </th>
                      ) : null}
                      <td className="w-full px-6 pt-4 font-display text-[1.3rem] sm:w-auto sm:py-4">{m.name}</td>
                      <td className="w-full px-6 pb-4 text-steel-600 sm:w-auto sm:py-4">{m.detail}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Details */}
      <section aria-labelledby="tiedot" className="bg-ink py-24 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-arc">Yritystiedot</p>
            <h2 id="tiedot" className="display-md mt-5 text-white">
              {company.name}
            </h2>
            <dl className="mt-8 space-y-4 text-steel-300">
              {[
                ['Y-tunnus', company.businessId],
                ['Osoite', `${company.address.street}, ${company.address.postalCode} ${company.address.city}`],
                ['Verkkolaskuosoite', company.einvoice.address],
                ['Operaattoritunnus', `${company.einvoice.operatorId} (${company.einvoice.operator})`],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-white/10 pb-4">
                  <dt className="label pt-1 text-steel-500">{k}</dt>
                  <dd className="text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to="/yhteystiedot" className="btn btn-arc mt-10">
              Yhteystiedot <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[2rem] bg-white p-8 text-ink sm:p-10">
              <img src={asset('images/vipuvoimaa-eu.webp')} width={637} height={306} alt="Vipuvoimaa EU:lta 2014–2020 – Euroopan unioni, Euroopan aluekehitysrahasto" className="h-auto w-full max-w-[22rem]" loading="lazy" />
              <p className="mt-6 text-steel-700">
                Haas VF-2 -koneistuskeskus · Euroopan aluekehitysrahasto, Vipuvoimaa EU:lta 2014–2020.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
