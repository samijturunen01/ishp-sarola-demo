import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Picture } from '../ui/Picture'
import { machineCount, machineGroups } from '../../data/machines'

/** The Haas VF-2 as the face of the machine park, with the full list as a spec sheet. */
export function MachineSpotlight() {
  return (
    <section aria-labelledby="konekanta-otsikko" className="relative overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div className="relative overflow-hidden rounded-[2.4rem]" data-reveal="wipe">
            <Picture
              slug="haas-vf2"
              alt="Haas VF-2YT -työstökeskus Sarolan verstaalla."
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="aspect-[4/3] w-full"
              position="40% 50%"
            />
            {/* Annotation callout – engraved-label style */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
              <p className="rounded-full bg-ink/80 px-4 py-2 backdrop-blur-md">
                <span className="label text-arc">Haas VF-2YT-EU</span>
                <span className="ml-3 text-sm text-steel-200">5-akselinen työstökeskus</span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="label text-arc" data-reveal>
            Konekanta
          </p>
          <h2 id="konekanta-otsikko" className="display-md mt-5 text-white" data-reveal>
            {machineCount} laitetta sorvista fiber-laseriin.
          </h2>
          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10" data-reveal="stagger">
            {machineGroups.map((g) => (
              <div key={g.id} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4 sm:grid-cols-[11rem_1fr]">
                <dt className="label pt-1 text-steel-500">{g.title}</dt>
                <dd className="col-span-2 font-mono text-[0.86rem] leading-relaxed text-steel-200 sm:col-span-1">
                  {g.items.map((m) => m.name).join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
          <Link to="/yritys#konekanta" className="link-weld mt-8 inline-flex items-center gap-2 font-semibold text-white" data-reveal>
            Koko konekanta tarkemmin <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
