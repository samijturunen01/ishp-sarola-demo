import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { mainNav } from '../../data/seo'
import { services } from '../../data/services'
import { company } from '../../data/company'

interface Props {
  open: boolean
  onClose: () => void
}

/** Full-screen mobile navigation with focus trap, Escape and scroll lock. */
export function MobileMenu({ open, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>('a, button')
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        document.querySelector<HTMLButtonElement>('[aria-controls="mobiilivalikko"]')?.focus()
      }
      if (e.key !== 'Tab' || !panel.current) return
      const toggle = document.querySelector<HTMLElement>('[aria-controls="mobiilivalikko"]')
      const items = [
        ...(toggle ? [toggle] : []),
        ...Array.from(panel.current.querySelectorAll<HTMLElement>('a, button')),
      ]
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const go = () => onClose()

  return (
    <div
      id="mobiilivalikko"
      ref={panel}
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto overscroll-contain bg-ink lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Valikko"
    >
      <div className="brushed flex min-h-full flex-col px-4 pb-8 pt-6 [--brushed-opacity:0.06] sm:px-8">
        <nav aria-label="Mobiilivalikko">
          <ul className="border-t border-white/10">
            {mainNav.map((item, i) => (
              <li key={item.to} className="border-b border-white/10">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={go}
                  className={({ isActive }) =>
                    `flex items-baseline gap-4 py-3.5 font-display text-[2.05rem] leading-none tracking-tight ${
                      isActive ? 'text-arc' : 'text-white'
                    }`
                  }
                >
                  <span className="label w-7 text-steel-500">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </NavLink>
                {item.to === '/palvelut' && (
                  <ul className="mb-4 ml-11 space-y-0.5">
                    {services.map((s) => (
                      <li key={s.key}>
                        <NavLink
                          to={s.path}
                          onClick={go}
                          className={({ isActive }) =>
                            `flex min-h-[2.75rem] items-center justify-between gap-3 text-[1.05rem] ${
                              isActive ? 'text-arc-hot' : 'text-steel-300'
                            }`
                          }
                        >
                          {s.title}
                          <ArrowUpRight size={16} aria-hidden className="text-steel-500" />
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto grid gap-3 pt-10">
          <Link to="/yhteystiedot#tarjouspyynto" onClick={onClose} className="btn btn-arc w-full">
            Pyydä tarjous
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a href={company.phones[0].href} className="btn btn-ghost w-full !px-3">
              <Phone size={17} aria-hidden /> Soita
            </a>
            <a href={`mailto:${company.email}`} className="btn btn-ghost w-full !px-3">
              <Mail size={17} aria-hidden /> Sähköposti
            </a>
          </div>
          <p className="label mt-4 text-steel-500">
            {company.address.street} · {company.address.postalCode} {company.address.city}
          </p>
        </div>
      </div>
    </div>
  )
}
