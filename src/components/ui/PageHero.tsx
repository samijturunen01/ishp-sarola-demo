import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Picture } from './Picture'
import type { ImageSlug } from '../../data/imageManifest'

export interface Crumb {
  to: string
  label: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Murupolku">
      <ol className="label flex flex-wrap items-center gap-x-2 gap-y-1 text-steel-500">
        <li>
          <Link to="/" className="hover:text-white">
            Etusivu
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.to} className="flex items-center gap-2">
            <ChevronRight size={12} aria-hidden />
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-steel-300">
                {c.label}
              </span>
            ) : (
              <Link to={c.to} className="hover:text-white">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

interface PageHeroProps {
  crumbs: Crumb[]
  kicker: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  /** Visual composition. */
  variant?: 'oval' | 'bleed' | 'type'
  image?: { slug: ImageSlug; alt: string; position?: string }
  /** Custom visual (e.g. an illustration) for the oval variant. */
  art?: ReactNode
  caption?: string
}

/**
 * Subpage hero in three compositions:
 *  - oval:  text left, image or illustration in the nameplate oval on the right
 *  - bleed: full-bleed photograph with text over a graded shadow
 *  - type:  typography-led with a large hairline ellipse
 */
export function PageHero({ crumbs, kicker, title, lead, children, variant = 'oval', image, art, caption }: PageHeroProps) {
  if (variant === 'bleed' && image) {
    return (
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink pb-16 pt-32 sm:pb-20">
        <Picture
          slug={image.slug}
          alt={image.alt}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-20"
          position={image.position}
          imgClassName="h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_12_14/0.55)_0%,rgb(11_12_14/0.15)_35%,rgb(11_12_14/0.75)_70%,#0b0c0e_100%)]" />
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <p className="label mt-10 text-arc">{kicker}</p>
          <h1 className="display-xl mt-5 max-w-[14ch] text-white">{title}</h1>
          {lead && <div className="lead mt-7 max-w-[38rem] text-steel-200">{lead}</div>}
          {children}
          {caption && <p className="label mt-10 text-steel-400">{caption}</p>}
        </div>
      </section>
    )
  }

  if (variant === 'type') {
    return (
      <section className="brushed relative isolate overflow-hidden bg-ink pb-20 pt-32 [--brushed-opacity:0.07] sm:pb-28 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[18vw] top-[12%] -z-10 aspect-[228/90] w-[85vw] rounded-[50%] border-[1.5px] border-arc/35"
        />
        <div aria-hidden className="pointer-events-none absolute -right-[10vw] top-[2%] -z-10 aspect-square w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgb(255_98_41/0.1),transparent)]" />
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <p className="label mt-12 text-arc">{kicker}</p>
          <h1 className="display-xl mt-5 max-w-[15ch] text-white">{title}</h1>
          {lead && <div className="lead mt-8 max-w-[42rem] text-steel-300">{lead}</div>}
          {children}
        </div>
      </section>
    )
  }

  return (
    <section className="brushed relative isolate overflow-hidden bg-ink pb-16 pt-28 [--brushed-opacity:0.07] sm:pt-36 lg:pb-24">
      <div className="shell grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Breadcrumbs items={crumbs} />
          <p className="label mt-10 text-arc">{kicker}</p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,5.4vw,5.6rem)] font-[640] leading-[0.94] tracking-[-0.028em] text-white [hyphens:manual]">
            {title}
          </h1>
          {lead && <div className="lead mt-7 max-w-[36rem] text-steel-300">{lead}</div>}
          {children}
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[40rem]">
            <div className="oval absolute inset-0 overflow-hidden">
              {art ?? (image && <Picture slug={image.slug} alt={image.alt} sizes="(min-width: 1024px) 46vw, 92vw" priority className="h-full w-full" position={image.position} />)}
            </div>
            <svg aria-hidden className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] overflow-visible">
              <ellipse cx="50%" cy="50%" rx="49.5%" ry="49.5%" fill="none" stroke="#ff6229" strokeWidth="1.5" />
            </svg>
          </div>
          {caption && <p className="label mt-6 text-center text-steel-500">{caption}</p>}
        </div>
      </div>
    </section>
  )
}
