import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '../../data/gallery'
import { IMAGE_MANIFEST } from '../../data/imageManifest'
import { asset } from '../../lib/asset'

interface Props {
  items: GalleryItem[]
  index: number | null
  onChange: (i: number | null) => void
}

/** Fullscreen viewer on the native <dialog>: Esc, focus return, arrows and swipe. */
export function Lightbox({ items, index, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const touch = useRef<number | null>(null)
  const open = index !== null
  const item = open ? items[index] : null

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onChange((index! + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index! - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, items.length, onChange])

  const m = item ? IMAGE_MANIFEST[item.slug] : null
  const widths = (m?.widths ?? []) as readonly number[]

  return (
    <dialog
      ref={ref}
      aria-label={item ? `Kuva: ${item.title}` : 'Kuva'}
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === ref.current) onChange(null)
      }}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null || index === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) onChange((index + (dx < 0 ? 1 : -1) + items.length) % items.length)
        touch.current = null
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink/97 p-0 text-white backdrop:bg-black/80"
    >
      {item && m && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <p className="label text-steel-400">
              {index! + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/20 hover:border-arc hover:text-arc"
              aria-label="Sulje kuva"
              autoFocus
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 sm:px-20">
            <img
              key={item.slug}
              src={asset(`images/${item.slug}-${widths.includes(1800) ? 1800 : widths[widths.length - 1]}.webp`)}
              srcSet={widths.map((w) => `${asset(`images/${item.slug}-${w}.webp`)} ${w}w`).join(', ')}
              sizes="92vw"
              width={m.w}
              height={m.h}
              alt={item.alt}
              className="min-h-0 max-h-full w-auto max-w-full flex-1 rounded-[1.2rem] object-contain"
            />
            <figcaption className="mt-5 flex w-full max-w-3xl flex-wrap items-baseline justify-between gap-3 text-center sm:text-left">
              <span className="font-display text-2xl">{item.title}</span>
              <span className="label text-steel-400">{item.date}</span>
              <span className="w-full text-sm text-steel-400">{item.alt}</span>
            </figcaption>
            <button
              type="button"
              onClick={() => onChange((index! - 1 + items.length) % items.length)}
              className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-ink/60 hover:border-arc hover:text-arc sm:grid"
              aria-label="Edellinen kuva"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onChange((index! + 1) % items.length)}
              className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-ink/60 hover:border-arc hover:text-arc sm:grid"
              aria-label="Seuraava kuva"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </figure>
          <div className="flex justify-center gap-3 pb-6 sm:hidden">
            <button type="button" onClick={() => onChange((index! - 1 + items.length) % items.length)} className="btn btn-ghost !min-h-[2.9rem]" aria-label="Edellinen kuva">
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button type="button" onClick={() => onChange((index! + 1) % items.length)} className="btn btn-ghost !min-h-[2.9rem]" aria-label="Seuraava kuva">
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
