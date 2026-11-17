import { asset } from '../lib/asset'

/**
 * Abloy key milling machine service – from the company's own price list
 * "Abloy avainjyrsinkoneiden varaosaluettelo" (ishp.fi PDF, page 11).
 * ⚠ The PDF is undated: confirm current prices before production.
 */
export const abloyTiers = [
  {
    id: 'perushuolto',
    name: 'Perushuolto',
    price: '390 €',
    plus: '+ mahdolliset osat',
    includes: [
      'Laitteiston purku ja pesu',
      'Osien kuluneisuuden tarkastus ja uusiminen',
      'Kalibrointi',
      'Koeavaimet luetaan indikaattorilla ja testataan lukolla',
      'Huoltoraportti tehdystä työstä ja uusituista osista',
    ],
  },
  {
    id: 'taysihuolto',
    name: 'Täysihuolto',
    price: '497 €',
    plus: '+ laakerit ja muut mahdolliset osat',
    includes: [
      'Kaikki perushuollon työt',
      'Sähkömoottorin purku',
      'Laakerien vaihto',
      'Koneen uudelleenmaalaus',
      'Koeavaimet ja huoltoraportti',
    ],
  },
] as const

export const abloyModels = ['Classic', 'Profile', 'Exec'] as const
export const abloyMachineNumbers = ['6122', '6123', 'AVA 9235', 'AVA 9600'] as const

export const abloyDocs = [
  {
    title: 'Abloy-avainjyrsinkoneiden varaosaluettelo',
    meta: 'PDF · 12 sivua · 0,7 Mt',
    href: asset('docs/Abloy-Varaosaluettelo.pdf'),
  },
  {
    title: 'Avainjyrsinkoneen manuaali',
    meta: 'PDF · 6 sivua · 2,6 Mt',
    href: asset('docs/Manuaali.pdf'),
  },
] as const

export const priceNote = 'Hinnat alv 0 %. Hintoihin lisätään todelliset rahtikustannukset. Pidätämme oikeuden hinnanmuutoksiin.'
