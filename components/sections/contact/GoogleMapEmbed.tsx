'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { site } from '@/config/site'

const { street, city, state, zip } = site.address
const FULL_ADDRESS = `${street}, ${city}, ${state} ${zip}, United States`
const ENCODED_ADDRESS = encodeURIComponent(FULL_ADDRESS)

// Embed URL — pb-format (standard iframe embed, no API key required).
// Coordinates: 35.6489, -88.8069 (Jackson, TN 38305 area).
// The !2s query param pinpoints the address even if the place-ID changes.
const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.6!2d-88.8069!3d35.6489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x887f48ef5b7b7e21%3A0x0!2s737%20Walker%20Rd%20Apt%20B%2C%20Jackson%2C%20TN%2038305%2C%20United%20States!5e0!3m2!1sen!2sus!4v1735000000000!5m2!1sen!2sus'

// Directions URL opens Google Maps navigation to this address
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED_ADDRESS}`

export function GoogleMapEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section aria-label="Office location map" className="relative">

      {/* Address bar — sits above the map */}
      <div className="flex flex-col gap-3 bg-charcoal-800/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between backdrop-blur-sm border-t border-white/[0.06]">
        <div className="flex items-start gap-3">
          <Icon name="MapPin" size="sm" className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
          <div>
            <p
              className="text-white/85"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.55 }}
            >
              {street}
            </p>
            <p
              className="text-white/50"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
            >
              {city}, {state} {zip} · United States
            </p>
          </div>
        </div>

        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${FULL_ADDRESS} in Google Maps`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-emerald-500/30 px-4 py-2 text-sm text-emerald-400 transition-colors duration-200 hover:bg-emerald-500/10 hover:border-emerald-400/50"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
        >
          <Icon name="Navigation" size="sm" aria-hidden="true" />
          Get Directions
        </a>
      </div>

      {/* Map iframe — lazy-loads on scroll into view */}
      <div ref={containerRef} className="relative h-80 sm:h-96">
        {isVisible ? (
          <iframe
            src={MAP_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing Averexa Placement office at ${FULL_ADDRESS}`}
            className="opacity-70 grayscale"
          />
        ) : (
          <div className="h-full w-full bg-charcoal-800 animate-pulse" />
        )}
      </div>

    </section>
  )
}
