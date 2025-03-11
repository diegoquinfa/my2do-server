import { ENV } from '@/lib/env'

export const verifyEmail = (token: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p>Dear User,</p>
    <p>Thank you for registering with us. Please verify your email address by clicking the link below:</p>
    <p>
      <a 
        href="${ENV.API_URL}/verify?token=${token}" 
        alt="_blank" 
        style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;"
      >
        Verify Email
      </a>
    </p>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Best regards,<br>My2do</p>
  </div>
`
