import type { ImageSlug } from './imageManifest'

export type ServiceKey = 'abloy' | 'cnc' | 'hitsaus' | 'kiillotus' | 'teknos'

export interface Service {
  key: ServiceKey
  path: string
  index: string
  title: string
  short: string
  summary: string
  image?: ImageSlug
  imageAlt?: string
  /** Default option in the inquiry form when arriving from this service. */
  formTopic: FormTopic
}

export const services: Service[] = [
  {
    key: 'abloy',
    path: '/palvelut/abloy-avainjyrsinkoneet',
    index: '01',
    title: 'Abloy-avainjyrsinkoneet',
    short: 'Huollot, varaosat ja sijaiskoneet',
    summary:
      'Perus- ja täysihuollot, varaosien myynti ja valmistus. Jokainen kone testataan koeavaimilla ennen palautusta.',
    image: 'avainjyrsinkone-huollossa',
    imageAlt: 'Avainjyrsinkone purettuna huoltoa varten työpöydällä.',
    formTopic: 'abloy',
  },
  {
    key: 'cnc',
    path: '/palvelut/cnc-koneistus',
    index: '02',
    title: 'CNC-koneistus',
    short: '3- ja 5-akselinen koneistus, sorvaus, hionta',
    summary:
      'Yksittäisosat, sopimusvalmistus, sarjat, prototyypit ja korjauskoneistukset – mallista, piirustuksesta tai luonnoksesta.',
    image: 'haas-vf2',
    imageAlt: 'Haas VF-2 -työstökeskus Sarolan verstaalla.',
    formTopic: 'cnc',
  },
  {
    key: 'hitsaus',
    path: '/palvelut/tig-hitsaus',
    index: '03',
    title: 'TIG-hitsaus & kokoonpano',
    short: 'Alumiini, RST, HST ja erikoismateriaalit',
    summary:
      'Tarkka TIG-hitsaus ja viimeistely sekä automaatio- ja kokoonpanotyöt yksittäisistä komponenteista kokonaisiin moduuleihin.',
    image: 'vetolaitteet-valmiit',
    imageAlt: 'Musta ja hopeanvärinen perävetolaitteen alaosa telineissä verstaalla.',
    formTopic: 'hitsaus',
  },
  {
    key: 'kiillotus',
    path: '/palvelut/kiillotus-ja-lasermerkkaus',
    index: '04',
    title: 'Kiillotus & lasermerkkaus',
    short: 'Tärykiillotus, vanteet, fiber-laser',
    summary:
      'Tärykiillotus Rösler- ja Gostol-koneilla – vanteista moottorin osiin – sekä pysyvät merkinnät 30 W fiber-laserilla.',
    image: 'vanteet-kiillotettu',
    imageAlt: 'Neljä kiillotettua alumiinivannetta verstaan lattialla.',
    formTopic: 'kiillotus',
  },
  {
    key: 'teknos',
    path: '/palvelut/teknos-savytyskoneet',
    index: '05',
    title: 'Teknos-sävytyskoneet',
    short: 'Huollot Itä-Suomessa ja Lapissa',
    summary: 'Teknos-sävytyskoneiden huollot maali- ja rautakaupoille Itä-Suomen ja Lapin alueella.',
    formTopic: 'teknos',
  },
]

export type FormTopic =
  | 'abloy'
  | 'cnc'
  | 'hitsaus'
  | 'kokoonpano'
  | 'kiillotus'
  | 'laser'
  | 'teknos'
  | 'tuvel'
  | 'sento'
  | 'muu'

export const formTopics: { value: FormTopic; label: string }[] = [
  { value: 'abloy', label: 'Abloy-avainjyrsinkoneen huolto tai varaosat' },
  { value: 'cnc', label: 'CNC-koneistus / osavalmistus' },
  { value: 'hitsaus', label: 'TIG-hitsaus' },
  { value: 'kokoonpano', label: 'Automaatio- ja kokoonpanotyöt' },
  { value: 'kiillotus', label: 'Kiillotus / tärykiillotus' },
  { value: 'laser', label: 'Lasermerkkaus' },
  { value: 'teknos', label: 'Teknos-sävytyskoneen huolto' },
  { value: 'tuvel', label: 'Tuvel-hiomaliuskat' },
  { value: 'sento', label: 'Sento-avainkoneet' },
  { value: 'muu', label: 'Muu asia' },
]

export const isFormTopic = (v: string | null): v is FormTopic => !!v && formTopics.some((t) => t.value === v)
