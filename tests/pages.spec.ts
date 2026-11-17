import { expect, test } from '@playwright/test'
import { B, routes, trackErrors } from './helpers'

for (const r of routes) {
  test(`renders /${r} without errors or horizontal overflow`, async ({ page }) => {
    const errors = trackErrors(page)
    const res = await page.goto(B + r)
    expect(res?.status()).toBe(200)
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 8000 })
    await expect(page).toHaveTitle(/Itä-Suomen Huoltopalvelu Sarola/)
    // Prerendered HTML carries real content and page metadata.
    const html = await res!.text()
    expect(html).toContain('<h1')
    expect(html).toMatch(/<meta name="description" content="[^"]{40,}"/)
    expect(html).toContain('noindex')
    // Scroll through to trigger every scroll animation, then check overflow.
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += 700) await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(400)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
    expect(errors).toEqual([])
  })
}

test('all images on the gallery page load', async ({ page }) => {
  await page.goto(B + 'galleria/')
  const imgs = page.locator('main img')
  const n = await imgs.count()
  expect(n).toBeGreaterThan(20)
  for (let i = 0; i < n; i++) await imgs.nth(i).scrollIntoViewIfNeeded()
  await page.waitForLoadState('networkidle')
  const broken = await page.evaluate(
    () =>
      [...document.querySelectorAll('main img')].filter((i) => !(i as HTMLImageElement).complete || (i as HTMLImageElement).naturalWidth === 0)
        .length,
  )
  expect(broken).toBe(0)
})

test('internal links point to existing pages', async ({ page, request }) => {
  const seen = new Set<string>()
  for (const r of routes) {
    await page.goto(B + r)
    const hrefs = await page.$$eval('a[href^="/ishp-sarola-demo/"]', (as) => as.map((a) => (a as HTMLAnchorElement).pathname))
    hrefs.forEach((h) => seen.add(h))
  }
  expect(seen.size).toBeGreaterThan(10)
  for (const p of seen) {
    const res = await request.get(p)
    expect(res.status(), p).toBe(200)
  }
})

test('unknown URL serves the branded 404 page', async ({ page }) => {
  const res = await page.goto(B + 'ei-ole-olemassa/')
  expect(res?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tätä osaa ei löytynyt')
  await page.getByRole('main').getByRole('link', { name: /^Etusivulle$/ }).click()
  await expect(page).toHaveURL(/\/ishp-sarola-demo\/?$/)
})

test('robots.txt and sitemap keep the demo out of search engines', async ({ request }) => {
  const robots = await (await request.get(B + 'robots.txt')).text()
  expect(robots).toContain('Disallow: /')
  const sitemap = await (await request.get(B + 'sitemap.xml')).text()
  expect(sitemap).toContain('palvelut/abloy-avainjyrsinkoneet/')
})
