import { expect, test } from '@playwright/test'
import { B, heroLeadOpacity, plateOpacity } from './helpers'

test('homepage intro plays on load and completes into the hero', async ({ page }) => {
  await page.goto(B)
  await expect.poll(() => plateOpacity(page), { timeout: 3000 }).toBeGreaterThan(0)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect.poll(() => heroLeadOpacity(page), { timeout: 5000 }).toBe(1)
})

test('intro plays again on refresh', async ({ page }) => {
  await page.goto(B)
  await expect.poll(() => heroLeadOpacity(page), { timeout: 5000 }).toBe(1)
  await page.reload()
  await expect.poll(() => plateOpacity(page), { timeout: 3000 }).toBeGreaterThan(0)
})

test('intro can be skipped instantly with any interaction', async ({ page }) => {
  await page.goto(B)
  await expect.poll(() => plateOpacity(page), { timeout: 3000 }).toBeGreaterThan(0)
  await page.keyboard.press('Shift')
  await expect.poll(() => heroLeadOpacity(page), { timeout: 1200 }).toBe(1)
})

test('intro does not replay when returning home through internal navigation', async ({ page }) => {
  await page.goto(B + 'yritys/')
  await page.getByRole('link', { name: /etusivulle/i }).first().click()
  await expect(page).toHaveURL(/\/ishp-sarola-demo\/?$/)
  await expect.poll(() => heroLeadOpacity(page), { timeout: 800 }).toBe(1)
  expect(await plateOpacity(page)).toBe(0)
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no intro, all content visible immediately', async ({ page }) => {
    await page.goto(B)
    await expect(page.locator('html')).toHaveClass(/no-motion/)
    expect(await heroLeadOpacity(page)).toBe(1)
    expect(await plateOpacity(page)).toBe(0)
    await expect(page.locator('.s2m-stacked')).toBeVisible()
    await page.goto(B + 'palvelut/')
    const hidden = await page.evaluate(
      () => [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity === '0').length,
    )
    expect(hidden).toBe(0)
  })
})
