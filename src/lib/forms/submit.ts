import type { InquiryPayload, SubmitResult } from './types'

/**
 * Form submission service – kept separate from the UI.
 *
 * DEMO (default): nothing is sent or stored. The promise resolves after a short
 * delay so the UI can show its "Demoversio – viestiä ei lähetetty." state.
 *
 * PRODUCTION (later, after customer approval):
 *   VITE_FORM_MODE=live
 *   VITE_FORM_ENDPOINT=https://script.google.com/macros/s/<deployment-id>/exec
 *   VITE_RECAPTCHA_SITE_KEY=<public site key>
 * The Google Apps Script must verify the reCAPTCHA token server-side with the
 * secret key (never shipped to the browser) before sending any email.
 */
const mode = import.meta.env.VITE_FORM_MODE === 'live' ? 'live' : 'demo'

export async function submitInquiry(payload: InquiryPayload): Promise<SubmitResult> {
  if (mode === 'demo') {
    void payload // intentionally discarded – demo never transmits personal data
    await new Promise((r) => setTimeout(r, 650))
    return { ok: true, mode: 'demo' }
  }
  return submitToAppsScript(payload)
}

async function submitToAppsScript(payload: InquiryPayload): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT
  if (!endpoint) return { ok: false, error: 'Lomakkeen vastaanotinta ei ole määritetty.' }
  try {
    const token = await getRecaptchaToken('inquiry')
    // Apps Script web apps accept text/plain without a CORS preflight.
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, recaptchaToken: token }),
    })
    if (!res.ok) throw new Error(String(res.status))
    return { ok: true, mode: 'live' }
  } catch {
    return { ok: false, error: 'Lähetys epäonnistui. Soita 0400 677 018 tai lähetä sähköpostia info@ishp.fi.' }
  }
}

/** Placeholder for reCAPTCHA v3 – activated only in production. */
async function getRecaptchaToken(action: string): Promise<string | null> {
  const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const g = (window as unknown as { grecaptcha?: { execute: (k: string, o: { action: string }) => Promise<string> } })
    .grecaptcha
  if (!key || !g) return null
  return g.execute(key, { action })
}
