import { Resend } from 'resend'
import { google } from 'googleapis'
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

async function sendReferralEmails(data: ReferralData): Promise<void> {
  if (!env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')

  const resend = new Resend(env.RESEND_API_KEY)

  const notificationHtml = `
    <h2 style="color:#1A8A71">New Referral via Averexa Refer &amp; Earn</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;font-weight:bold">Referrer</td><td style="padding:8px">${data.referrerName} (${data.referrerEmail})</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Candidate</td><td style="padding:8px">${data.candidateName} (${data.candidateEmail})</td></tr>
      ${data.candidatePhone ? `<tr><td style="padding:8px;font-weight:bold">Candidate Phone</td><td style="padding:8px">${data.candidatePhone}</td></tr>` : ''}
      ${data.candidateRole ? `<tr><td style="padding:8px;font-weight:bold">Target Role</td><td style="padding:8px">${data.candidateRole}</td></tr>` : ''}
      ${data.notes ? `<tr><td style="padding:8px;font-weight:bold">Notes</td><td style="padding:8px">${data.notes}</td></tr>` : ''}
    </table>
  `

  const confirmationHtml = `
    <h2 style="color:#1A8A71">Hi ${data.referrerName},</h2>
    <p>Thank you for referring ${data.candidateName} to Averexa. We've received your referral and will reach out to them shortly.</p>
    <p>A member of our team will also contact you to walk through our referral reward details personally.</p>
    <p style="margin-top:24px">- The Averexa Team</p>
  `

  await Promise.all([
    resend.emails.send({
      from: 'Averexa <noreply@averexa.com>',
      to: ['info@averexa.com'],
      subject: `New Referral: ${data.candidateName} (from ${data.referrerName})`,
      html: notificationHtml,
    }),
    resend.emails.send({
      from: 'Averexa <noreply@averexa.com>',
      to: [data.referrerEmail],
      subject: 'We received your referral Averexa',
      html: confirmationHtml,
    }),
  ])
}

async function appendReferralToSheet(data: ReferralData): Promise<void> {
  if (
    !env.GOOGLE_SHEETS_CLIENT_EMAIL ||
    !env.GOOGLE_SHEETS_PRIVATE_KEY ||
    !env.GOOGLE_SHEETS_SPREADSHEET_ID
  ) {
    throw new Error('Google Sheets credentials not configured')
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: 'Referrals!A:H',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.referrerName,
        data.referrerEmail,
        data.candidateName,
        data.candidateEmail,
        data.candidatePhone ?? '',
        data.candidateRole ?? '',
        data.notes ?? '',
      ]],
    },
  })
}

export async function processReferralSubmission(data: ReferralData): Promise<void> {
  const [emailResult, sheetsResult] = await Promise.allSettled([
    sendReferralEmails(data),
    appendReferralToSheet(data),
  ])

  if (emailResult.status === 'rejected' && sheetsResult.status === 'rejected') {
    throw new Error('All notification channels failed')
  }
}
