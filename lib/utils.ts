import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cleans a phone number by:
 * 1. Removing all non-digit characters except a leading +
 * 2. Auto-prepending +91 for 10-digit Indian mobile numbers
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone) return ''

  const cleaned = phone.replace(/[^\d+]/g, '')

  if (cleaned.startsWith('+')) return cleaned

  if (/^[6-9]\d{9}$/.test(cleaned)) return `+91${cleaned}`

  return cleaned
}
