import type { CSSProperties } from 'react'
import { IMAGE_MANIFEST, type ImageSlug } from '../../data/imageManifest'
import { asset } from '../../lib/asset'

interface PictureProps {
  slug: ImageSlug
  alt: string
  /** CSS sizes attribute – describe the rendered width for the browser. */
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  /** object-position, e.g. "50% 40%". */
  position?: string
  style?: CSSProperties
  /** Show the blurred placeholder underneath while loading. */
  placeholder?: boolean
  /** Wrapper element – use "span" inside phrasing content such as <p>. */
  as?: 'div' | 'span'
}

export const srcFor = (slug: ImageSlug, w: number) => {
  const widths = IMAGE_MANIFEST[slug].widths as readonly number[]
  const best = widths.find((x) => x >= w) ?? widths[widths.length - 1]
  return asset(`images/${slug}-${best}.webp`)
}

/** Responsive WebP image with intrinsic dimensions to prevent layout shift. */
export function Picture({
  slug,
  alt,
  sizes = '100vw',
  className,
  imgClassName = 'h-full w-full object-cover',
  priority = false,
  position,
  style,
  placeholder = true,
  as: Wrapper = 'div',
}: PictureProps) {
  const m = IMAGE_MANIFEST[slug]
  const widths = m.widths as readonly number[]
  const srcSet = widths.map((w) => `${asset(`images/${slug}-${w}.webp`)} ${w}w`).join(', ')
  const fallback = asset(`images/${slug}-${widths.includes(1200) ? 1200 : widths[widths.length - 1]}.webp`)
  return (
    <Wrapper
      className={className}
      style={{
        ...(placeholder ? { backgroundImage: `url(${m.lqip})`, backgroundSize: 'cover', backgroundPosition: position ?? 'center' } : null),
        ...style,
      }}
    >
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        width={m.w}
        height={m.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={position ? { objectPosition: position } : undefined}
        draggable={false}
      />
    </Wrapper>
  )
}
