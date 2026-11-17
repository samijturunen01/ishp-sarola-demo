import { expect, test } from '@playwright/test'
import { B, isMobile } from './helpers'

test('"Etusivu" is the first main navigation item and the logo links home', async ({ page }) => {
  await page.goto(B + 'yritys/')
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Avaa valikko' }).click()
    await expect(page.locator('#mobiilivalikko nav a').first()).toContainText('Etusivu')
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobiilivalikko')).toBeHidden()
  } else {
    const nav = page.getByRole('navigation', { name: 'Päävalikko' })
    await expect(nav.getByRole('link').first()).toHaveText('Etusivu')
    await expect(nav.getByRole('link', { name: 'Yritys' })).toHaveAttribute('aria-current', 'page')
  }
  await page.getByRole('link', { name: /etusivulle/i }).first().click()
  await expect(page).toHaveURL(/\/ishp-sarola-demo\/?$/)
})

test('main navigation opens the destination page at the top', async ({ page }) => {
  await page.goto(B + 'palvelut/cnc-koneistus/')
  await page.evaluate(() => window.scrollTo(0, 2500))
  await page.waitForTimeout(300)
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Avaa valikko' }).click()
    await page.locator('#mobiilivalikko').getByRole('link', { name: 'Galleria' }).click()
  } else {
    await page.getByRole('navigation', { name: 'Päävalikko' }).getByRole('link', { name: 'Galleria' }).click()
  }
  await expect(page).toHaveURL(/galleria/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Suoraan')
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('content links open new pages at the top; hash CTAs land on their section', async ({ page }) => {
  await page.goto(B + 'palvelut/abloy-avainjyrsinkoneet/')
  const next = page.getByRole('link', { name: /Seuraava palvelu/ })
  await next.scrollIntoViewIfNeeded()
  await next.click()
  await expect(page).toHaveURL(/cnc-koneistus/)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  await page.getByRole('main').getByRole('link', { name: /Pyydä tarjous/ }).first().click()
  await expect(page).toHaveURL(/yhteystiedot\/?\?palvelu=cnc#tarjouspyynto/)
  await expect(page.locator('#tarjouspyynto h2')).toBeInViewport({ timeout: 5000 })
})

test('browser back and forward restore pages and scroll position', async ({ page }) => {
  await page.goto(B + 'yritys/')
  await page.evaluate(() => window.scrollTo(0, 1800))
  await page.waitForTimeout(400)
  const before = await page.evaluate(() => window.scrollY)
  await page.getByRole('contentinfo').getByRole('link', { name: 'Tuotteet' }).click()
  await expect(page).toHaveURL(/tuotteet/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await page.goBack()
  await expect(page).toHaveURL(/yritys/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before - 200)
  await page.goForward()
  await expect(page).toHaveURL(/tuotteet/)
})

test('page changes are immediate – no blocking overlay', async ({ page }) => {
  await page.goto(B + 'tuotteet/')
  const t0 = Date.now()
  await page.getByRole('contentinfo').getByRole('link', { name: 'Yhteystiedot' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(Date.now() - t0).toBeLessThan(1500)
})

test('mobile menu closes with Escape and returns focus', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(B + 'palvelut/')
  const toggle = page.getByRole('button', { name: 'Avaa valikko' })
  await toggle.click()
  await expect(page.locator('#mobiilivalikko')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobiilivalikko')).toBeHidden()
  await expect(page.getByRole('button', { name: 'Avaa valikko' })).toBeFocused()
})

test('desktop services dropdown is keyboard operable', async ({ page }) => {
  test.skip(isMobile(page), 'desktop only')
  await page.goto(B + 'yritys/')
  await page.getByRole('button', { name: 'Näytä palvelut' }).click()
  await expect(page.locator('#palvelut-valikko')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#palvelut-valikko')).toBeHidden()
})
