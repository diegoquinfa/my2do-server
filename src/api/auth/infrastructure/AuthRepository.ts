import { Database } from '@/database/mongo'
import { IAuthRepository } from '../domain/IAuthRepository'
import { User } from '../domain/User'
import { errorHandler } from '@/lib/errorHandler'
import { DatabaseError } from '@/shared/infrastructure/errors/DatabaseError'
import { NotFoundError } from '@/shared/infrastructure/errors/NotFoundError'
import { sendEmail } from '@/lib/sendEmail'
import { verifyEmail } from '@/templates/emails/verifyEmail'

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

  async existsEmail(email: string): Promise<boolean> {
    let user: User | null = null

    try {
      const collection = await Database.collection<User>('users')
      user = await collection.findOne({ email })
    } catch (err) {
      throw errorHandler(err, DatabaseError)
    }

    return Boolean(user)
  }

  async getUserByEmail(email: string): Promise<User> {
    let user: User | null = null

    try {
      const collection = await Database.collection<User>('users')
      user = await collection.findOne({ email })
    } catch (err) {
      throw errorHandler(err, DatabaseError)
    }

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  }
}
