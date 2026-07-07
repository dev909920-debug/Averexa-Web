export type APIResponse<T> = {
  success: true
  data: T
} | {
  success: false
  error: string
  code?: string
}

export type ReferralFormPayload = {
  referrerName: string
  referrerEmail: string
  candidateName: string
  candidateEmail: string
  candidatePhone?: string
  candidateRole?: string
  notes?: string
  turnstileToken: string
}
