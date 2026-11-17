import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Phone } from 'lucide-react'
import { LogoPlate } from '../brand/LogoPlate'
import { mainNav } from '../../data/seo'
import { services } from '../../data/services'
import { company } from '../../data/company'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus whenever the route changes (state adjusted during render, no effect).
  const [path, setPath] = useState(location.pathname)
  if (path !== location.pathname) {
    setPath(location.pathname)
    setMenuOpen(false)
    setServicesOpen(false)
  }

  // Services dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!servicesOpen) return
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false)
        servicesRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [servicesOpen])

  const servicesActive = location.pathname.startsWith('/palvelut')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || menuOpen
            ? 'bg-ink/88 shadow-[0_1px_0_rgb(255_255_255/0.07)] backdrop-blur-md'
            : 'bg-gradient-to-b from-ink/70 to-transparent'
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.25rem]">
          <Link
            to="/"
           
            className="group relative -ml-1 block shrink-0 rounded-[50%] p-1"
            aria-label="Itä-Suomen Huoltopalvelu Sarola – etusivulle"
          >
            <LogoPlate title={null} className="h-[2.75rem] w-auto transition-transform duration-500 group-hover:scale-[1.04] lg:h-[3.5rem]" />
          </Link>

          <nav aria-label="Päävalikko" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {mainNav.map((item) =>
                item.to === '/palvelut' ? (
                  <li key={item.to} ref={servicesRef} className="relative flex items-center">
                    <NavLink
                      to={item.to}
                     
                      className={() => navClass(servicesActive)}
                    >
                      <NavLabel label={item.label} active={servicesActive} />
                    </NavLink>
                    <button
                      type="button"
                      className="-ml-2 grid h-9 w-8 place-items-center rounded-full text-steel-300 hover:text-white"
                      aria-expanded={servicesOpen}
                      aria-controls="palvelut-valikko"
                      aria-label="Näytä palvelut"
                      onClick={() => setServicesOpen((o) => !o)}
                    >
                      <ChevronDown size={16} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      id="palvelut-valikko"
                      hidden={!servicesOpen}
                      className="absolute left-1/2 top-full mt-3 w-[25rem] -translate-x-1/2 overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-2/97 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl"
                    >
                      <ul>
                        {services.map((s) => (
                          <li key={s.key}>
                            <NavLink
                              to={s.path}
                             
                              className={({ isActive }) =>
                                `group flex items-baseline gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5 ${
                                  isActive ? 'bg-white/[0.06]' : ''
                                }`
                              }
                            >
                              <span className="label text-arc">{s.index}</span>
                              <span>
                                <span className="block font-display text-[1.2rem] leading-tight text-white">{s.title}</span>
                                <span className="mt-0.5 block text-sm text-steel-400">{s.short}</span>
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.to}>
                    <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => navClass(isActive)}>
                      {({ isActive }) => <NavLabel label={item.label} active={isActive} />}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={company.phones[0].href}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white transition-colors hover:text-arc-hot xl:flex"
            >
              <Phone size={16} aria-hidden className="text-arc" />
              {company.phones[0].display}
            </a>
            <Link to="/yhteystiedot#tarjouspyynto" className="btn btn-arc hidden !min-h-[2.75rem] !px-5 text-[0.95rem] sm:inline-flex">
              Pyydä tarjous
            </Link>
            <button
              type="button"
              className="relative grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobiilivalikko"
              aria-label={menuOpen ? 'Sulje valikko' : 'Avaa valikko'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                    menuOpen ? 'translate-y-[5.25px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                    menuOpen ? '-translate-y-[5.25px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

const navClass = (active: boolean) =>
  `relative block rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
    active ? 'text-white' : 'text-steel-300 hover:text-white'
  }`

/** Active item gets a hairline orange oval – the nameplate rim. */
function NavLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <>
      {active && (
        <span aria-hidden className="absolute inset-x-0.5 inset-y-0.5 rounded-[50%] border-[1.5px] border-arc/90" />
      )}
      <span className="relative">{label}</span>
    </>
  )
}
