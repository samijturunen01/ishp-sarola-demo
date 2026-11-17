import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { B, routes } from './helpers'

// Reduced motion so every element is in its final, visible state for the scan.
test.use({ reducedMotion: 'reduce' })

for (const r of routes) {
  test(`no serious accessibility violations on /${r}`, async ({ page }) => {
    await page.goto(B + r)
    await page.waitForTimeout(300)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serious.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
  })
}
