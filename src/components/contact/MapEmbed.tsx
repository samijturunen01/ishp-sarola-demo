import { useState } from 'react'
import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { company, mapsDirectionsUrl, mapsEmbedUrl, mapsOpenUrl } from '../../data/company'

/**
 * Privacy-conscious Google Maps embed: nothing is loaded from Google until the
 * visitor chooses to load the map. No API key required.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  const address = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`

  return (
    <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-ink-2">
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
        {loaded ? (
          <iframe
            title={`Kartta: ${company.name}, ${address}`}
            src={mapsEmbedUrl}
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.35)_contrast(1.05)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden">
            {/* Abstract street-grid placeholder (not a real map). */}
            <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
              <rect width="800" height="400" fill="#121417" />
              <g stroke="#24282d" strokeWidth="14" fill="none" strokeLinecap="round">
                <path d="M-20 300 C 180 250, 320 280, 420 190 S 650 90, 820 120" />
                <path d="M240 -20 C 260 120, 300 240, 280 420" />
                <path d="M560 -20 L 520 420" />
              </g>
              <g stroke="#1c1f23" strokeWidth="6" fill="none">
                <path d="M0 80 H 800 M0 160 H 800 M120 0 V 400 M400 0 V 400 M680 0 V 400" />
              </g>
              <ellipse cx="420" cy="190" rx="90" ry="36" fill="none" stroke="#ff6229" strokeWidth="1.5" opacity=".7" />
              <ellipse cx="420" cy="190" rx="150" ry="60" fill="none" stroke="#ff6229" strokeWidth="1" opacity=".3" />
            </svg>
            <div className="relative mx-4 max-w-md rounded-[1.8rem] bg-ink/90 p-7 text-center backdrop-blur-md">
              <MapPin size={28} aria-hidden className="mx-auto text-arc" />
              <p className="mt-3 font-display text-2xl text-white">{address}</p>
              <p className="mt-1 text-sm text-steel-400">
                {company.address.district}, {company.address.city}
              </p>
              <button type="button" onClick={() => setLoaded(true)} className="btn btn-arc mt-6">
                Lataa kartta
              </button>
              <p className="mt-4 text-xs text-steel-500">Kartta ladataan Googlelta vasta, kun valitset sen.</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 p-5 sm:p-6">
        <p className="label text-steel-400">
          {company.geo.lat.toFixed(4)}° N · {company.geo.lon.toFixed(4)}° E
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-arc !min-h-[2.9rem]">
            <Navigation size={17} aria-hidden /> Katso reittiohjeet
          </a>
          <a href={mapsOpenUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-[2.9rem]">
            Avaa Google Mapsissa <ExternalLink size={15} aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}
