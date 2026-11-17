/**
 * Visual QA: full-page screenshots of every route at one viewport, merged into
 * downscaled overview strips. Usage: node scripts/qa-pages.mjs <baseUrl> <outDir> <width> <height>
 */
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const [base, out, w = '1440', h = '900'] = process.argv.slice(2)
const routes = ['palvelut', 'palvelut/abloy-avainjyrsinkoneet', 'palvelut/cnc-koneistus', 'palvelut/tig-hitsaus', 'palvelut/kiillotus-ja-lasermerkkaus', 'palvelut/teknos-savytyskoneet', 'tuotteet', 'galleria', 'yritys', 'yhteystiedot', 'olematon-sivu']
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
for (const r of routes) {
  await page.goto(base + r + '/', { waitUntil: 'networkidle' })
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += Math.round(Number(h) * 0.7)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(140)
  }
  await page.waitForTimeout(1300)
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  const file = `${out}/${r.replace(/\//g, '_')}-${w}.png`
  await page.screenshot({ path: file, fullPage: true })
  const meta = await sharp(file).metadata()
  // split tall pages into columns for viewing
  const colH = Number(w) > 600 ? 3600 : 2600
  const n = Math.ceil(meta.height / colH)
  const scale = Number(w) > 600 ? 0.3 : 0.55
  const cw = Math.round(meta.width * scale)
  const tiles = []
  for (let i = 0; i < n; i++) {
    const top = i * colH
    const hh = Math.min(colH, meta.height - top)
    tiles.push({ input: await sharp(file).extract({ left: 0, top, width: meta.width, height: hh }).resize(cw).toBuffer(), left: i * (cw + 10), top: 0 })
  }
  await sharp({ create: { width: n * (cw + 10), height: Math.ceil(colH * scale) + 4, channels: 3, background: '#444' } })
    .composite(tiles).jpeg({ quality: 78 }).toFile(file.replace('.png', '-sheet.jpg'))
  console.log(r, 'h=' + total, 'overflowX=' + ov)
}
console.log(errors.length ? 'ERRORS:\n' + [...new Set(errors)].join('\n') : 'no console errors')
await browser.close()
