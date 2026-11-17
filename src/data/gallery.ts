import type { ImageSlug } from './imageManifest'

export type GalleryCategory = 'kiillotus' | 'vanteet' | 'koneistus' | 'hitsaus' | 'huollot'

export const galleryCategories: { id: GalleryCategory | 'kaikki'; label: string }[] = [
  { id: 'kaikki', label: 'Kaikki' },
  { id: 'kiillotus', label: 'Kiillotus' },
  { id: 'vanteet', label: 'Vanteet' },
  { id: 'koneistus', label: 'Koneistus' },
  { id: 'hitsaus', label: 'Hitsaus & korjaus' },
  { id: 'huollot', label: 'Huollot & verstas' },
]

export interface GalleryItem {
  slug: ImageSlug
  title: string
  alt: string
  category: GalleryCategory
  /** Camera date from the original file name (dd.mm.yyyy). */
  date: string
}

/**
 * All photographs come from the company's own galleries on ishp.fi
 * (/kuvia/ and /gallery-2/) or its homepage. Captions describe only what is
 * visible in each photo.
 */
export const gallery: GalleryItem[] = [
  {
    slug: 'ristikkovanne-kiillotettu',
    title: 'Ristikkovanne peilikiillotettuna',
    alt: 'Ristikkopuolainen alumiinivanne kiillotettuna peilikirkkaaksi; valo heijastuu jokaisesta puolasta.',
    category: 'vanteet',
    date: '10.10.2024',
  },
  {
    slug: 'moottorin-kansi-kiillotettu',
    title: 'Moottorin kansi',
    alt: 'Pitkä rivoitettu alumiininen moottorin kansi kiillotettuna kromimaiseen kiiltoon pakkausvanun päällä.',
    category: 'kiillotus',
    date: '13.11.2023',
  },
  {
    slug: 'hammaspyora-istukassa',
    title: 'Hammaspyörä istukassa',
    alt: 'Teräksinen hammaspyörä kiinnitettynä kolmileukaistukkaan koneistusta varten.',
    category: 'koneistus',
    date: '15.11.2022',
  },
  {
    slug: 'vanteet-kiillotettu',
    title: 'Neljä kiillotettua vannetta',
    alt: 'Neljä kaksoispuolaista alumiinivannetta kiillotettuina verstaan lattialla.',
    category: 'vanteet',
    date: '12.8.2024',
  },
  {
    slug: 'vetolaite-vaurio',
    title: 'Vaurioitunut evä',
    alt: 'Perävetolaitteen alaosa, jonka evän kärki on lohkeillut.',
    category: 'hitsaus',
    date: '2.9.2024',
  },
  {
    slug: 'moottorin-kotelo-kiillotettu',
    title: 'Moottorin kotelonpuoliskot',
    alt: 'Moottorin alumiiniset kotelonpuoliskot kiillotettuina työpöydällä.',
    category: 'kiillotus',
    date: '26.11.2024',
  },
  {
    slug: 'avainjyrsinkone-huollossa',
    title: 'Avainjyrsinkone huollossa',
    alt: 'Avainjyrsinkone purettuna: moottori, terä, avainistukka ja syöttövipu työpöydällä huollon aikana.',
    category: 'huollot',
    date: '7.9.2022',
  },
  {
    slug: 'alumiinikappaleet-peili',
    title: 'Peilipintaiset kappaleet',
    alt: 'Kaksi alumiinikappaletta peilikiillotettuina reikäpöydällä; pinnat heijastavat ympäristön.',
    category: 'kiillotus',
    date: '27.9.2024',
  },
  {
    slug: 'vetolaite-hitsattu',
    title: 'Evät korjattuina',
    alt: 'Kaksi perävetolaitteen alaosaa telineissä; evät korjattuina ja hiottuina muotoonsa.',
    category: 'hitsaus',
    date: '2.9.2024',
  },
  {
    slug: 'ristikkovanne-tyon-alla',
    title: 'Ristikkovanne työn alla',
    alt: 'Ristikkovanteen puolat kiillotuksen aikana, keskiö peitettynä.',
    category: 'vanteet',
    date: '7.10.2024',
  },
  {
    slug: 'hammaspyorat',
    title: 'Hammaspyöriä',
    alt: 'Viisi koneistettua teräksistä hammaspyörää työpöydällä.',
    category: 'koneistus',
    date: '16.11.2022',
  },
  {
    slug: 'rivoitetut-kannet-kiillotettu',
    title: 'Rivoitetut kannet',
    alt: 'Kaksi rivoitettua alumiinikantta peilikiillotettuina.',
    category: 'kiillotus',
    date: '5.12.2024',
  },
  {
    slug: 'vetolaite-pohjamaali',
    title: 'Pohjamaalattuina',
    alt: 'Kaksi perävetolaitteen alaosaa vaaleassa pohjamaalissa telineissä.',
    category: 'hitsaus',
    date: '2.9.2024',
  },
  {
    slug: 'vanne-klassikko-kiillotettu',
    title: 'Klassikkovanne',
    alt: 'Viisipuolainen klassikkovanne kiillotettuna kromimaiseen kiiltoon.',
    category: 'vanteet',
    date: '27.9.2024',
  },
  {
    slug: 'haas-vf2',
    title: 'Haas VF-2 -työstökeskus',
    alt: 'Haas VF-2YT -työstökeskus Sarolan verstaalla.',
    category: 'koneistus',
    date: '16.12.2021',
  },
  {
    slug: 'kiillotetut-osat',
    title: 'Kiillotettuja osia',
    alt: 'Moottorin kansia ja pienosia kiillotettuina vanerilevyn päällä.',
    category: 'kiillotus',
    date: '5.12.2024',
  },
  {
    slug: 'vetolaite-maalaus',
    title: 'Pintamaalattuina',
    alt: 'Kaksi perävetolaitteen alaosaa harmaaksi maalattuina telineissä.',
    category: 'hitsaus',
    date: '3.9.2024',
  },
  {
    slug: 'lasermerkkauskone',
    title: 'Fiber-lasermerkkauskone',
    alt: 'Fiber-lasermerkkauskone ja sitä ohjaava kannettava tietokone työpisteellä.',
    category: 'huollot',
    date: '16.4.2021',
  },
  {
    slug: 'vetolaite-valmis',
    title: 'Kiiltävä musta pinta',
    alt: 'Mustaksi maalattu, kiiltävä perävetolaitteen alaosa telineessä.',
    category: 'hitsaus',
    date: '17.9.2024',
  },
  {
    slug: 'vanne-mattamusta',
    title: 'Mattamusta vanne',
    alt: 'Mattamusta kaksoispuolainen alumiinivanne, jossa kiiltävä reunus.',
    category: 'vanteet',
    date: '29.7.2024',
  },
  {
    slug: 'vetolaitteet-valmiit',
    title: 'Valmiit vetolaitteet',
    alt: 'Musta ja hopeanvärinen perävetolaitteen alaosa valmiina telineissä.',
    category: 'hitsaus',
    date: '27.9.2024',
  },
  {
    slug: 'vetolaite-harmaa',
    title: 'Harmaa vetolaite',
    alt: 'Harmaaksi maalattu perävetolaitteen alaosa verstaan lattialla.',
    category: 'hitsaus',
    date: '14.8.2024',
  },
  {
    slug: 'vetolaite-musta',
    title: 'Musta vetolaite',
    alt: 'Kiiltävän musta perävetolaitteen alaosa kuvattuna läheltä.',
    category: 'hitsaus',
    date: '14.8.2024',
  },
  {
    slug: 'verstas-lylykoskentie',
    title: 'Verstas Lylykoskentiellä',
    alt: 'Sarolan verstasrakennus Lylykoskentie 31:ssä, seinässä ISHP.FI-kyltti.',
    category: 'huollot',
    date: '12.9.2020',
  },
]

export const galleryBySlug = (slug: ImageSlug) => gallery.find((g) => g.slug === slug)
