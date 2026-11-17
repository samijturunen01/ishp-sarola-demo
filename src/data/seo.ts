export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

const brand = 'Itä-Suomen Huoltopalvelu Sarola'

/** Page-specific metadata – consumed by the prerenderer and at runtime. */
export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: `${brand} – koneistus, TIG-hitsaus ja huollot Joensuussa`,
    description:
      'CNC-koneistus, TIG-hitsaus, kiillotus sekä Abloy-avainjyrsinkoneiden ja Teknos-sävytyskoneiden huollot Joensuun Käpykankaalla vuodesta 2011.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: `Palvelut – koneistus, hitsaus, kiillotus ja konehuollot | ${brand}`,
    description:
      'Abloy-avainjyrsinkoneiden huollot, CNC-koneistus, TIG-hitsaus, tärykiillotus, lasermerkkaus ja Teknos-sävytyskoneiden huollot yhdeltä joensuulaiselta verstaalta.',
  },
  {
    path: '/palvelut/abloy-avainjyrsinkoneet',
    label: 'Abloy-avainjyrsinkoneet',
    title: `Abloy-avainjyrsinkoneiden huolto ja varaosat | ${brand}`,
    description:
      'Abloy-avainjyrsinkoneiden perus- ja täysihuollot, varaosat ja sijaiskone huollon ajaksi. Classic, Profile ja Exec – testattu koeavaimilla.',
  },
  {
    path: '/palvelut/cnc-koneistus',
    label: 'CNC-koneistus',
    title: `CNC-koneistus Joensuussa – 3- ja 5-akselinen | ${brand}`,
    description:
      'Yksittäisosat, sopimusvalmistus, sarjat, prototyypit ja korjauskoneistukset 3- ja 5-akselisilla CNC-koneilla. Valmistus 3D-mallista, mallikappaleesta tai luonnoksesta.',
  },
  {
    path: '/palvelut/tig-hitsaus',
    label: 'TIG-hitsaus & kokoonpano',
    title: `TIG-hitsaus Joensuussa – alumiini, RST ja HST | ${brand}`,
    description:
      'TIG-hitsaukset alumiinille, rosterille, hapokkaille ja erikoismateriaaleille sekä automaatio- ja kokoonpanotyöt Joensuun Käpykankaalla.',
  },
  {
    path: '/palvelut/kiillotus-ja-lasermerkkaus',
    label: 'Kiillotus & lasermerkkaus',
    title: `Tärykiillotus, vanteiden kiillotus ja lasermerkkaus | ${brand}`,
    description:
      'Tärykiillotus Rösler- ja Gostol-koneilla vanteista moottorin osiin sekä pysyvät merkinnät 30 W fiber-laserilla Joensuussa.',
  },
  {
    path: '/palvelut/teknos-savytyskoneet',
    label: 'Teknos-sävytyskoneet',
    title: `Teknos-sävytyskoneiden huolto Itä-Suomessa ja Lapissa | ${brand}`,
    description: 'Teknos-sävytyskoneiden huollot maali- ja rautakaupoille Itä-Suomen ja Lapin alueella.',
  },
  {
    path: '/tuotteet',
    label: 'Tuotteet',
    title: `Tuotteet – Tuvel-hiomaliuskat, Abloy-varaosat, Sento-avainkoneet | ${brand}`,
    description:
      'Valmistamme Tuvel-hiomaliuskoja karkeuksilla P120–P2000 sekä myymme ja valmistamme Abloy-avainjyrsinkoneiden varaosia.',
  },
  {
    path: '/galleria',
    label: 'Galleria',
    title: `Galleria – kiillotus, vanteet, koneistus ja hitsaus | ${brand}`,
    description:
      'Kuvia Sarolan verstaalta: peilikiillotetut vanteet ja moottorin osat, koneistetut hammaspyörät ja vetolaitteiden korjaukset.',
  },
  {
    path: '/yritys',
    label: 'Yritys',
    title: `Yritys ja konekanta – Käpykankaalla vuodesta 2011 | ${brand}`,
    description:
      'Vuonna 2011 perustettu teollisuusalan yritys 400 m² tiloissa Joensuun Käpykankaalla. Moniosaaminen, laaja yhteistyöverkosto ja kattava konekanta.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: `Yhteystiedot ja tarjouspyyntö | ${brand}`,
    description:
      'Lylykoskentie 31, 80130 Joensuu. Puh. 0400 677 018, info@ishp.fi. Lähetä tarjouspyyntö tai huoltopyyntö lomakkeella.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: `Sivua ei löytynyt | ${brand}`,
    description: 'Etsimääsi sivua ei löytynyt. Palaa etusivulle tai ota yhteyttä.',
  },
]

export const metaFor = (path: string) => {
  const clean = path.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean) ?? routes[routes.length - 1]
}

export const mainNav = [
  { to: '/', label: 'Etusivu' },
  { to: '/palvelut', label: 'Palvelut' },
  { to: '/tuotteet', label: 'Tuotteet' },
  { to: '/galleria', label: 'Galleria' },
  { to: '/yritys', label: 'Yritys' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
] as const
