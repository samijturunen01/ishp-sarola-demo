import { useId, useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'

export interface QA {
  q: string
  a: ReactNode
}

/** Accessible FAQ accordion (button + region pattern). */
export function Accordion({ items, tone = 'light' }: { items: QA[]; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const line = tone === 'light' ? 'border-ink/12' : 'border-white/12'
  return (
    <div className={`border-t ${line}`}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className={`border-b ${line}`}>
            <h3 className="m-0">
              <button
                type="button"
                id={`${base}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[1.35rem] leading-snug sm:text-[1.6rem]"
              >
                {it.q}
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-transform duration-500 ${
                    tone === 'light' ? 'border-ink/20' : 'border-white/20'
                  } ${isOpen ? 'rotate-45 border-arc text-arc-deep' : ''}`}
                >
                  <Plus size={18} aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={`${base}-p${i}`}
              role="region"
              aria-labelledby={`${base}-b${i}`}
              hidden={!isOpen}
              className={`max-w-[48rem] pb-7 text-[1.05rem] leading-relaxed ${tone === 'light' ? 'text-steel-700' : 'text-steel-300'}`}
            >
              {it.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
