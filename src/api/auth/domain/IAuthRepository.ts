import { User } from '@/shared/domain/User'

export interface IAuthRepository {
  sendEmailVerification(email: string): Promise<void>
  register(user: User): Promise<void>
  getUserByEmail(email: string): Promise<User | null>
}
