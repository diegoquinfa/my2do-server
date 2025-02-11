import { User } from './User'

export interface IAuthRepository {
  register(user: User): Promise<void>
  existsEmail(email: string): Promise<boolean>
  getUserByEmail(email: string): Promise<User>
}
