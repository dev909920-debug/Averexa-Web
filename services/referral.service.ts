import { env } from '@/config/env'

export type ReferralData = {
  referrerName: string
  referrerEmail: string
  candidateName: string
  candidateEmail: string
  candidatePhone?: string
  candidateRole?: string
  notes?: string
}

export async function processReferralSubmission(data: ReferralData): Promise<void> {
  if (!env.GOOGLE_SHEETS_WEBHOOK_URL) {
    throw new Error('Google Sheets webhook not configured')
  }

  const res = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'referral',
      timestamp: new Date().toISOString(),
      referrerName: data.referrerName,
      referrerEmail: data.referrerEmail,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      candidatePhone: (data.candidatePhone ?? '').replace(/\D/g, ''),
      candidateRole: data.candidateRole ?? '',
      notes: data.notes ?? '',
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to submit referral')
  }
}
