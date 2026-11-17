/**
 * Visual QA helper. Captures screenshots of a page at a viewport size.
 *   node scripts/capture.mjs <url> <outPrefix> [width] [height] [--intro] [--full] [--shots=0,800,1600]
 * --intro  captures frames during the homepage intro animation
 * --full   scrolls through the page (triggering reveals) and saves a full-page shot
 * --shots  captures the viewport at the given scroll offsets
 * Console errors and page errors are printed.
 */
import { chromium } from '@playwright/test'

const [url, out, w = '1440', h = '900', ...flags] = process.argv.slice(2)
const has = (f) => flags.includes(f)
const shotsArg = flags.find((f) => f.startsWith('--shots='))
const reduce = has('--reduce')

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: Number(w) < 600 ? 2 : 1,
  reducedMotion: reduce ? 'reduce' : 'no-preference',
})
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(url, { waitUntil: 'domcontentloaded' })

if (has('--intro')) {
  // Frames are timed from the moment the intro starts (html.intro-pending removed).
  await page.waitForFunction(() => !document.documentElement.classList.contains('intro-pending'))
  const t0 = Date.now()
  for (const t of [250, 700, 1150, 1600, 2100, 2600, 3400]) {
    const wait = t - (Date.now() - t0)
    if (wait > 0) await page.waitForTimeout(wait)
    await page.screenshot({ path: `${out}-intro-${t}.png` })
  }
} else {
  await page.waitForTimeout(3800)
}

if (shotsArg) {
  for (const y of shotsArg.slice(8).split(',').map(Number)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(1300)
    await page.screenshot({ path: `${out}-y${y}.png` })
  }
}

if (has('--full')) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += Math.round(Number(h) * 0.6)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(160)
  }
  await page.waitForTimeout(1200)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${out}-full.png`, fullPage: true })
}

if (!shotsArg && !has('--full')) await page.screenshot({ path: `${out}.png` })

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
console.log(`overflow-x: ${overflow}px`)
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'no console errors')
await browser.close()
