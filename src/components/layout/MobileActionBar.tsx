import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Phone } from 'lucide-react'
import { company } from '../../data/company'

/** Thumb-reach call / quote bar on phones; appears after the first screen. */
export function MobileActionBar() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (pathname.replace(/\/+$/, '') === '/yhteystiedot') return null

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-ink-2/92 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-lg transition-[transform,opacity] duration-500 lg:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[140%] opacity-0'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!show}
    >
      <a href={company.phones[0].href} tabIndex={show ? 0 : -1} className="btn btn-ghost !min-h-[2.9rem] !border-white/15 !px-3 text-[0.95rem]">
        <Phone size={17} aria-hidden className="text-arc" /> Soita
      </a>
      <Link to="/yhteystiedot#tarjouspyynto" tabIndex={show ? 0 : -1} className="btn btn-arc !min-h-[2.9rem] !px-3 text-[0.95rem]">
        <FileText size={17} aria-hidden /> Tarjouspyyntö
      </Link>
    </div>
  )
}
