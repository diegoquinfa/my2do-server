import { Database } from '@/database/mongo'
import { IAuthRepository } from '../domain/IAuthRepository'
import { User } from '../domain/User'

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
}
