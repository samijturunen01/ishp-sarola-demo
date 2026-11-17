import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { introState } from '../../lib/intro'
import { ScrollTrigger } from '../../lib/motion'

const positions = new Map<string, number>()
const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect

/**
 * Scroll behaviour on navigation:
 *  - New page (PUSH/REPLACE) without hash → opens at the very top, instantly.
 *  - Hash links → scroll to the target section.
 *  - Back/forward (POP) → restores the stored position for that history entry.
 * Runs in a layout effect so the reset happens before paint (no flicker).
 */
export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  // Compare history keys (not a "first run" flag) so StrictMode's double effects stay idempotent.
  const initialKey = useRef(location.key)
  const lastPath = useRef(location.pathname)

  useIsoLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Remember the scroll position of every history entry (for back/forward).
  const keyRef = useRef(location.key)
  useIsoLayoutEffect(() => {
    keyRef.current = location.key
  }, [location.key])
  useIsoLayoutEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        positions.set(keyRef.current, window.scrollY)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useIsoLayoutEffect(() => {
    if (location.key === initialKey.current && !introState.navigated) {
      if (location.hash) scrollToHashAfterLayout(location.hash, false)
      return
    }
    introState.navigated = true
    const samePage = lastPath.current === location.pathname
    lastPath.current = location.pathname

    if (navType === 'POP') {
      const saved = positions.get(location.key)
      if (saved === undefined && location.hash) {
        scrollToHashAfterLayout(location.hash, samePage)
        return
      }
      const y = saved ?? 0
      window.scrollTo({ top: y, left: 0, behavior: 'instant' })
      // Pinned sections change document height – re-apply after triggers refresh.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        window.scrollTo({ top: y, left: 0, behavior: 'instant' })
      })
      return
    }

    if (location.hash) {
      scrollToHashAfterLayout(location.hash, samePage)
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname, location.search, location.hash, location.key, navType])

  return null
}

function scrollToHash(hash: string, smooth = false) {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'instant', block: 'start' })
}

/**
 * Same page → smooth scroll to the section. New page → jump straight to the
 * section once layout and scroll triggers have settled (no visible scrolling).
 */
function scrollToHashAfterLayout(hash: string, samePage: boolean) {
  if (samePage) {
    scrollToHash(hash, true)
    return
  }
  scrollToHash(hash)
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      scrollToHash(hash)
    }),
  )
}
