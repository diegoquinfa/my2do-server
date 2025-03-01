import jwt from 'jsonwebtoken'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { authLoginSchema } from '../domain/AuthLogin'
import { IAuthRepository } from '../domain/IAuthRepository'
import { AuthLoginResponse } from '../domain/AuthLoginResponse'
import { ENV } from '@/lib/env'

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
      throw new ValidationError({ message: "User or Password don't match" })
    }

    const token = jwt.sign({ name: user.name, email: user.email }, ENV.JWT_SECRET)

    const authResponse: AuthLoginResponse = {
      _id: user._id?.toString(),
      name: user.name,
      email: user.email,
      jwt: token
    }

    return authResponse
  }
}
