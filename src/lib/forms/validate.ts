export type Errors = Partial<Record<string, string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneRe = /^[+()\d\s-]{6,20}$/

export interface ValidatableFields {
  name: string
  email: string
  phone: string
  message: string
  topic: string
}

/** Client-side validation with Finnish messages. Returns an empty object when valid. */
export function validateInquiry(v: ValidatableFields): Errors {
  const e: Errors = {}
  if (!v.topic) e.topic = 'Valitse, mitä asia koskee.'
  if (v.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  const email = v.email.trim()
  const phone = v.phone.trim()
  if (!email && !phone) {
    e.email = 'Anna sähköposti tai puhelinnumero, jotta voimme vastata.'
  }
  if (email && !emailRe.test(email)) e.email = 'Tarkista sähköpostiosoite (esim. nimi@yritys.fi).'
  if (phone && !phoneRe.test(phone)) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (v.message.trim().length < 10) e.message = 'Kerro lyhyesti, mitä pitäisi tehdä (vähintään 10 merkkiä).'
  if (v.message.length > 4000) e.message = 'Viesti on liian pitkä (enintään 4000 merkkiä).'
  return e
}
