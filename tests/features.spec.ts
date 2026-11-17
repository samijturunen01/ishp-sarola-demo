import { expect, test } from '@playwright/test'
import { B } from './helpers'

test('inquiry form validates and never sends in demo mode', async ({ page }) => {
  const outgoing: string[] = []
  page.on('request', (r) => {
    if (r.method() === 'POST') outgoing.push(r.url())
  })
  await page.goto(B + 'yhteystiedot/?palvelu=abloy#tarjouspyynto')
  const form = page.locator('#tarjouspyynto form')
  await expect(form.getByLabel(/Mitä asia koskee/)).toHaveValue('abloy')
  await expect(form.getByLabel('Konemalli')).toBeVisible()

  await form.getByRole('button', { name: 'Lähetä tarjouspyyntö' }).click()
  await expect(form.getByRole('alert')).toContainText('Tarkista seuraavat kohdat')
  await expect(form.getByText('Kirjoita nimesi.').first()).toBeVisible()

  await form.getByLabel(/^Nimi/).fill('Testi Henkilö')
  await form.getByLabel(/^Sähköposti/).fill('virheellinen')
  await form.getByLabel(/^Kuvaus/).fill('Kone tarvitsee perushuollon.')
  await form.getByRole('button', { name: 'Lähetä tarjouspyyntö' }).click()
  await expect(form.getByText('Tarkista sähköpostiosoite').first()).toBeVisible()

  await form.getByLabel(/^Sähköposti/).fill('testi@example.com')
  await form.getByRole('button', { name: 'Lähetä tarjouspyyntö' }).click()
  await expect(page.getByRole('status')).toContainText('Demoversio – viestiä ei lähetetty.')
  expect(outgoing).toEqual([])
})

test('Abloy comparison toggles service level and preselects it in the form', async ({ page }) => {
  await page.goto(B + 'palvelut/abloy-avainjyrsinkoneet/')
  await page.getByRole('radio', { name: 'Täysihuolto' }).click()
  await expect(page.getByRole('radio', { name: 'Täysihuolto' })).toHaveAttribute('aria-checked', 'true')
  await page.getByRole('link', { name: 'Tilaa täysihuolto' }).click()
  await expect(page).toHaveURL(/palvelu=abloy&taso=taysihuolto/)
  await expect(page.locator('#tarjouspyynto form').getByLabel('Mitä tarvitaan?')).toHaveValue('Täysihuolto')
})

test('Google Map loads on request at the verified address with a directions link', async ({ page }) => {
  await page.goto(B + 'yhteystiedot/')
  await expect(page.locator('iframe')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Katso reittiohjeet' })).toHaveAttribute(
    'href',
    /google\.com\/maps\/dir\/\?api=1&destination=Lylykoskentie%2031%2C%2080130%20Joensuu/,
  )
  await expect(page.getByRole('link', { name: /Avaa Google Mapsissa/ })).toHaveAttribute('href', /Lylykoskentie/)
  await page.getByRole('button', { name: 'Lataa kartta' }).click()
  const frame = page.locator('iframe[title^="Kartta"]')
  await expect(frame).toBeVisible()
  await expect(frame).toHaveAttribute('src', /maps\.google\.com\/maps\?q=Lylykoskentie%2031%2C%2080130%20Joensuu.*output=embed/)
  const box = await frame.boundingBox()
  expect(box!.width).toBeGreaterThan(300)
})

test('gallery filters and lightbox work with keyboard', async ({ page }) => {
  await page.goto(B + 'galleria/')
  const items = page.locator('main button[data-gallery-item]')
  const all = await items.count()
  await page.getByRole('button', { name: /^Vanteet/ }).click()
  await expect.poll(() => items.count()).toBeLessThan(all)
  await items.first().click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  const first = await dialog.locator('img').getAttribute('alt')
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('img')).not.toHaveAttribute('alt', first!)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})

test('CNC starting-point tabs switch content', async ({ page }) => {
  await page.goto(B + 'palvelut/cnc-koneistus/')
  await page.getByRole('tab', { name: '3D-malli' }).click()
  await expect(page.getByRole('tabpanel')).toContainText('3D-kuva tai valmis malli')
})

test('grit scale reports the selected grit', async ({ page }) => {
  await page.goto(B + 'tuotteet/')
  const slider = page.getByRole('slider')
  await slider.fill('1000')
  await expect(page.locator('output')).toHaveText('P2000')
  await slider.fill('0')
  await expect(page.locator('output')).toHaveText('P120')
})
