import { IAuthRepository } from '@/api/auth/domain/IAuthRepository'
import { User } from '@/api/auth/domain/User'

export class AuthRepositoryMock implements IAuthRepository {
  private db: User[]

  constructor() {
    this.db = []
  }

  async register(user: User): Promise<void> {
    this.db.push(user)
  }

  async existsEmail(email: string): Promise<boolean> {
    return Boolean(this.db.find((user) => user.email === email))
  }
}
