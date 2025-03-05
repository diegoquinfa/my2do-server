import { User } from './User'

export interface IAuthRepository {
  sendEmailVerification(email: string): Promise<void>
  register(user: User): Promise<void>
  existsEmail(email: string): Promise<boolean>
  getUserByEmail(email: string): Promise<User>
}
