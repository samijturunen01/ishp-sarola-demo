/**
 * Verified company facts (see docs/CONTENT_SOURCES.md). Single source of truth
 * for every page, the footer, structured data and the contact page.
 *
 * ⚠ The company registered "Itä-Suomen Huoltopalvelu Sarola Oy" (3667108-4) on
 * 29.10.2026. The site still publishes the sole-proprietor details below –
 * confirm with the owner before production and update here only.
 */
export const company = {
  name: 'Itä-Suomen Huoltopalvelu Sarola',
  shortName: 'ISHP Sarola',
  businessId: '2400653-8',
  founded: 2011,
  premisesM2: 400,
  address: {
    street: 'Lylykoskentie 31',
    postalCode: '80130',
    city: 'Joensuu',
    district: 'Käpykangas',
  },
  geo: { lat: 62.623897, lon: 29.748214 },
  phones: [
    { display: '0400 677 018', href: 'tel:+358400677018', note: 'Päänumero' },
    { display: '040 837 0424', href: 'tel:+358408370424', note: 'Toinen numero' },
  ],
  email: 'info@ishp.fi',
  einvoice: { address: '003724006538', operatorId: '003721291126', operator: 'Maventa' },
  /** From a public business directory listing – ⚠ confirm with the owner. */
  hours: [
    { days: 'Ma–to', time: '8.00–16.00' },
    { days: 'Pe', time: '8.00–15.30' },
    { days: 'La–su', time: 'Suljettu' },
  ],
  originalSite: 'https://ishp.fi/',
} as const

export const mapsQuery = encodeURIComponent(
  `${company.address.street}, ${company.address.postalCode} ${company.address.city}`,
)
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=15&hl=fi&output=embed`
export const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`
