import { Resend } from 'resend'
import { ENV } from './env'

const resend = new Resend(ENV.EMAIL_API_KEY)

export const sendEmail = async (toEmail: string, subject: string, html: string) => {
  return await resend.emails.send({
    from: ENV.EMAIL_DOMAIN,
    to: toEmail,
    subject,
    html
  })
}
