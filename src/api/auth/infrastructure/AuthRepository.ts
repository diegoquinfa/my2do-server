import { Database } from '@/database/mongo'
import { IAuthRepository } from '../domain/IAuthRepository'
import { User } from '../domain/User'

export class AuthRepository implements IAuthRepository {
  async register(newUser: User): Promise<void> {
    const collection = await Database.collection<User>('users')
    await collection.insertOne(newUser)
  }
}
