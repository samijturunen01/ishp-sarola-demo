/** Konekanta – verbatim machine list from ishp.fi/palvelut, grouped by process. */
export interface MachineGroup {
  id: string
  title: string
  items: { name: string; detail?: string }[]
}

export const machineGroups: MachineGroup[] = [
  {
    id: 'jyrsinta',
    title: 'Jyrsintä & työstökeskukset',
    items: [
      { name: 'Haas VF-2YT-EU', detail: '5-akselinen työstökeskus' },
      { name: 'Cincinnati Arrow 500', detail: 'Työstökeskus' },
      { name: 'Deckel FP4NC', detail: 'NC-jyrsinkone' },
    ],
  },
  {
    id: 'sorvaus',
    title: 'Sorvaus',
    items: [
      { name: 'Femco Durga 30', detail: 'CNC-sorvi, pyörivät työkalut' },
      { name: 'Takisawa TC-2', detail: 'CNC-sorvi' },
      { name: 'Harrison VS330 TR', detail: 'Manuaalisorvi' },
    ],
  },
  {
    id: 'hionta',
    title: 'Hionta & teroitus',
    items: [
      { name: 'Jakobsen SJ 30', detail: 'Tasohiomakone' },
      { name: 'Jakobsen 824', detail: 'Tasohiomakone' },
      { name: 'Jack Mill J-40', detail: 'Työkaluhiomakone' },
      { name: 'Arboga A/S', detail: 'Nauhahiomakone' },
      { name: 'Pear', detail: 'Teroituskone' },
    ],
  },
  {
    id: 'hitsaus',
    title: 'Hitsaus',
    items: [
      { name: '250 A AC/DC', detail: 'Pulssi-TIG' },
      { name: '160 A DC', detail: 'Pulssi-TIG' },
      { name: 'Kempomat 3200', detail: 'MIG/MAG' },
      { name: 'ProMig 530', detail: 'MIG/MAG' },
    ],
  },
  {
    id: 'viimeistely',
    title: 'Viimeistely & merkintä',
    items: [
      { name: 'Rösler R300', detail: 'Tärykiillotus' },
      { name: 'Gostol', detail: 'Tärykiillotus – vanteet yms.' },
      { name: 'Fiber-laser 30 W', detail: 'Lasermerkkauskone' },
      { name: 'Lasikuulapuhalluskaappi', detail: 'Pintakäsittely' },
    ],
  },
  {
    id: 'muut',
    title: 'Sahaus & poraus',
    items: [
      { name: 'Speeder', detail: 'Vannesaha' },
      { name: 'Serr. mac.', detail: 'Pylväsporakone' },
    ],
  },
]

export const machineCount = machineGroups.reduce((n, g) => n + g.items.length, 0)
