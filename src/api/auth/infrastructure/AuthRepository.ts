import { Database } from '@/database/mongo'
import { IAuthRepository } from '../domain/IAuthRepository'
import { errorHandler } from '@/lib/errorHandler'
import { DatabaseError } from '@/shared/infrastructure/errors/DatabaseError'
import { sendEmail } from '@/lib/sendEmail'
import { verifyEmail } from '@/templates/emails/verifyEmail'
import { User } from '@/shared/domain/User'

export class AuthRepository implements IAuthRepository {
  async sendEmailVerification(email: string) {
    try {
      const subject = 'My2do email verification'
      const emailRes = await sendEmail(email, subject, verifyEmail(crypto.randomUUID()))

      if (emailRes.error) {
        throw new Error(emailRes.error.message)
      }
    } catch (err) {
      throw errorHandler(err)
    }
  }

  async register(newUserData: User): Promise<void> {
    try {
      const collection = await Database.collection<User>('users')
      await collection.insertOne(newUserData)
    } catch (err) {
      throw errorHandler(err, DatabaseError)
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const collection = await Database.collection<User>('users')
      return await collection.findOne({ email })
    } catch (err) {
      throw errorHandler(err, DatabaseError)
    }
  }
}
