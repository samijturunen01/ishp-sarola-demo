import type { Page } from '@playwright/test'

export const B = '/ishp-sarola-demo/'

export const routes = [
  '',
  'palvelut/',
  'palvelut/abloy-avainjyrsinkoneet/',
  'palvelut/cnc-koneistus/',
  'palvelut/tig-hitsaus/',
  'palvelut/kiillotus-ja-lasermerkkaus/',
  'palvelut/teknos-savytyskoneet/',
  'tuotteet/',
  'galleria/',
  'yritys/',
  'yhteystiedot/',
]

/** Collect console errors and uncaught exceptions for a page. */
export function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  return errors
}

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Opacity of the hero lead paragraph (fully visible once the intro is done). */
export const heroLeadOpacity = (page: Page) =>
  page.evaluate(() => {
    const el = document.querySelector('#hero-title + p')
    return el ? Number(getComputedStyle(el).opacity) : -1
  })

/** Opacity of the animated nameplate used by the intro. */
export const plateOpacity = (page: Page) =>
  page.evaluate(() => {
    const el = document.querySelector('[data-hero-plate]')
    return el ? Number(getComputedStyle(el).opacity) : -1
  })
