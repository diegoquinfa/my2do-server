import { Database } from '@/database/mongo'
import { IAuthRepository } from '../domain/IAuthRepository'
import { User } from '../domain/User'
import { DatabaseError } from '@/shared/application/errors/DatabaseError'

export class AuthRepository implements IAuthRepository {
  async register(newUserData: User): Promise<void> {
    const collection = await Database.collection<User>('users')
    await collection.insertOne(newUserData)
  }

  async existsEmail(email: string): Promise<boolean> {
    const collection = await Database.collection<User>('users')
    const user = await collection.findOne({
      email
    })

    return Boolean(user)
  }

  async getUserByEmail(email: string): Promise<User> {
    const collection = await Database.collection<User>('users')
    const user = await collection.findOne({
      email
    })

    if (!user) {
      throw new DatabaseError(new Error('Not found'))
    }

    return user as User
  }
}
