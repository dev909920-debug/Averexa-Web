import { Resend } from 'resend'
import { env } from '@/config/env'

type ContactData = {
  fullName: string
  email: string
  phone: string
  targetJobTitle: string
  description?: string
}

export async function sendContactEmails(data: ContactData): Promise<void> {
  if (!env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')

  const resend = new Resend(env.RESEND_API_KEY)

  const notificationHtml = `
    <h2 style="color:#1A8A71">New Lead via Averexa Contact Form</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${data.fullName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${data.email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${data.phone}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Target Role</td><td style="padding:8px">${data.targetJobTitle}</td></tr>
      ${data.description ? `<tr><td style="padding:8px;font-weight:bold">Notes</td><td style="padding:8px">${data.description}</td></tr>` : ''}
    </table>
  `

  const confirmationHtml = `
    <h2 style="color:#1A8A71">Hi ${data.fullName},</h2>
    <p>Thank you for reaching out to Averexa. We've received your enquiry and will be in touch within 1–2 business days.</p>
    <p>In the meantime, feel free to connect with us on <a href="https://wa.me/" style="color:#1A8A71">WhatsApp</a>.</p>
    <p style="margin-top:24px">- The Averexa Team</p>
  `

  await Promise.all([
    resend.emails.send({
      from: 'Averexa <noreply@averexa.com>',
      to: ['info@averexa.com'],
      subject: `New Lead: ${data.fullName} ${data.targetJobTitle}`,
      html: notificationHtml,
    }),
    resend.emails.send({
      from: 'Averexa <noreply@averexa.com>',
      to: [data.email],
      subject: 'We received your enquiry Averexa',
      html: confirmationHtml,
    }),
  ])
}
