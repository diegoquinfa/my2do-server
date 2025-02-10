import { User } from './User'

export interface IAuthRepository {
  register(user: User): Promise<void>
}
