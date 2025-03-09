import { compare } from 'bcrypt-ts'
import { ValidationError } from '@/shared/application/errors/ValidationError'
import { AuthLoginSchema } from '../domain/AuthLogin'
import { IAuthRepository } from '../domain/IAuthRepository'
import { AuthLoginResponse } from '../domain/AuthLoginResponse'
import { jwt } from '@/lib/jtw'

export class AuthLogin {
  private readonly repository: IAuthRepository

  constructor(repository: IAuthRepository) {
    this.repository = repository
  }

  public async run(authLoginData: unknown): Promise<AuthLoginResponse> {
    const authLogin = AuthLoginSchema.safeParse(authLoginData)

    if (authLogin.error) {
      throw new ValidationError(authLogin.error.flatten())
    }

    const user = await this.repository.getUserByEmail(authLogin.data.email)

    if (!user) {
      throw new ValidationError("User or Password don't match")
    }

    const isValidPassword = await compare(authLogin.data.password, user.password)
    if (!isValidPassword) {
      throw new ValidationError("User or Password don't match")
    }

    const token = jwt.createJWT({ _id: user._id, name: user.name, email: user.email })

    const authResponse: AuthLoginResponse = {
      _id: user._id?.toString(),
      name: user.name,
      email: user.email,
      jwt: token
    }

    return authResponse
  }
}
