import { Instrument_Serif, Plus_Jakarta_Sans, DM_Sans, DM_Mono } from 'next/font/google'

// Instrument Serif — editorial serif for hero headlines and premium display moments.
// Ink-trap design gives it a considered, refined quality distinct from commodity serifs.
// Only ships weight 400 (normal + italic); elegance comes from letterform design, not weight.
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
})

// Plus Jakarta Sans — geometric humanist for all headings and UI elements.
// Superior to Syne: same contemporary confidence without the "design agency" baggage.
// Full weight range (400–800) enables clear hierarchy across all heading levels.
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

// DM Sans — humanist sans for body copy. Warm, highly legible at small sizes.
// Retained from the original system — it performs well and is already cache-optimised.
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

// DM Mono — refined mono for eyebrows, data labels, and process counters.
// Far more executive than JetBrains Mono; designed by the same foundry as DM Sans
// so it harmonises optically with the body font.
// Variable name kept as --font-jetbrains-mono for backward-compat with all components.
export const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

export const fontVariables = `${instrumentSerif.variable} ${plusJakartaSans.variable} ${dmSans.variable} ${dmMono.variable}`
