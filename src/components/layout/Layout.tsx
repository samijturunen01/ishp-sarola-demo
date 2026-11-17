import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { ScrollManager } from './ScrollManager'
import { useReveals } from '../../hooks/useReveals'
import { metaFor } from '../../data/seo'

export function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)
  useReveals(pathname)

  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    // Move focus to the new page for keyboard and screen-reader users.
    if (firstRender.current) firstRender.current = false
    else mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a
        href="#sisalto"
        onClick={(e) => {
          e.preventDefault()
          mainRef.current?.focus()
        }}
        className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-full bg-arc px-5 py-3 font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Siirry sisältöön
      </a>
      <ScrollManager />
      <Header />
      <main id="sisalto" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
