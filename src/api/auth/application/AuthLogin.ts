import jwt from 'jsonwebtoken'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { authLoginSchema } from '../domain/AuthLogin'
import { IAuthRepository } from '../domain/IAuthRepository'
import { AuthLoginResponse, authLoginResponseSchema } from '../domain/AuthLoginResponse'

export class AuthLogin {
  private readonly repository: IAuthRepository
  constructor(repository: IAuthRepository) {
    this.repository = repository
  }

  public async run(authLoginData: unknown): Promise<AuthLoginResponse> {
    const authLogin = authLoginSchema.safeParse(authLoginData)

    if (authLogin.error) {
      throw new ValidationError(authLogin.error.flatten())
    }

    const user = await this.repository.getUserByEmail(authLogin.data.email)

    if (!user) {
      throw new ValidationError({ message: 'User not found' })
    }

    const token = jwt.sign({ user }, 'shhhhh')

    const authResponse = authLoginResponseSchema.safeParse({
      ...user,
      jwt: token,
      _id: user._id?.toString()
    })

    if (authResponse.error) {
      throw new ValidationError('ni idea')
    }

    return authResponse.data
  }
}
