import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Minus } from 'lucide-react'
import { abloyTiers, priceNote } from '../../data/abloy'

const rows: { label: string; perus: boolean; taysi: boolean }[] = [
  { label: 'Laitteiston purku ja pesu', perus: true, taysi: true },
  { label: 'Osien kuluneisuuden tarkastus ja uusiminen', perus: true, taysi: true },
  { label: 'Kalibrointi', perus: true, taysi: true },
  { label: 'Koeavaimet: luenta indikaattorilla ja testaus lukolla', perus: true, taysi: true },
  { label: 'Huoltoraportti tehdystä työstä ja uusituista osista', perus: true, taysi: true },
  { label: 'Sähkömoottorin purku ja laakerien vaihto', perus: false, taysi: true },
  { label: 'Koneen uudelleenmaalaus', perus: false, taysi: true },
]

type TierId = (typeof abloyTiers)[number]['id']

/**
 * Interactive comparison of the two service levels. On desktop both columns are
 * visible and the selected one is highlighted; on phones the toggle swaps the column.
 */
export function AbloyCompare() {
  const [tier, setTier] = useState<TierId>('perushuolto')
  const isTaysi = tier === 'taysihuolto'

  return (
    <div>
      <div role="radiogroup" aria-label="Valitse huoltotaso" className="inline-flex rounded-full border border-ink/15 bg-white p-1">
        {abloyTiers.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={tier === t.id}
            onClick={() => setTier(t.id)}
            className={`min-h-[2.75rem] rounded-full px-5 text-[0.95rem] font-semibold transition-colors duration-300 ${
              tier === t.id ? 'bg-ink text-white' : 'text-steel-700 hover:text-ink'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-ink/12 bg-white">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Abloy-avainjyrsinkoneen perushuollon ja täysihuollon sisältö ja hinta</caption>
          <thead>
            <tr className="border-b border-ink/10">
              <th scope="col" className="p-5 align-bottom sm:p-7">
                <span className="label text-steel-600">Huollon sisältö</span>
              </th>
              {abloyTiers.map((t) => {
                const selected = tier === t.id
                return (
                  <th
                    key={t.id}
                    scope="col"
                    className={`w-[34%] p-5 align-bottom transition-colors duration-500 sm:w-[24%] sm:p-7 ${
                      selected ? 'bg-ink text-white' : 'text-ink'
                    } ${selected ? '' : 'hidden sm:table-cell'}`}
                  >
                    <span className={`label block ${selected ? 'text-arc' : 'text-arc-deep'}`}>{t.name}</span>
                    <span className="mt-2 block font-display text-[2.1rem] leading-none tracking-tight sm:text-[2.6rem]">{t.price}</span>
                    <span className={`mt-1 block text-xs font-normal ${selected ? 'text-steel-300' : 'text-steel-600'}`}>
                      alv 0 % {t.plus}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-ink/8 last:border-0">
                <th scope="row" className="p-5 text-[0.98rem] font-normal text-steel-800 sm:px-7 sm:py-5">
                  {r.label}
                </th>
                {(['perushuolto', 'taysihuolto'] as const).map((id) => {
                  const on = id === 'perushuolto' ? r.perus : r.taysi
                  const selected = tier === id
                  return (
                    <td
                      key={id}
                      className={`p-5 transition-colors duration-500 sm:px-7 ${selected ? 'bg-ink/[0.035]' : ''} ${
                        selected ? '' : 'hidden sm:table-cell'
                      }`}
                    >
                      {on ? (
                        <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-arc text-ink">
                          <Check size={16} strokeWidth={2.6} aria-hidden />
                          <span className="sr-only">Sisältyy</span>
                        </span>
                      ) : (
                        <span className="inline-grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-steel-500">
                          <Minus size={16} aria-hidden />
                          <span className="sr-only">Ei sisälly</span>
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <p className="max-w-xl text-sm text-steel-600">{priceNote} Hinnat yrityksen varaosaluettelosta – varmista ajantasainen hinta tilatessa.</p>
        <Link to={`/yhteystiedot?palvelu=abloy&taso=${tier}#tarjouspyynto`} className="btn btn-dark">
          Tilaa {isTaysi ? 'täysihuolto' : 'perushuolto'}
        </Link>
      </div>
    </div>
  )
}
