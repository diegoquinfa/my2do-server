import { AuthLogin } from '../application/AuthLogin'
import { AuthRegister } from '../application/AuthRegister'
import { AuthRepository } from './AuthRepository'

const repository = new AuthRepository()

export const authContainer = {
  register: new AuthRegister(repository),
  login: new AuthLogin(repository)
}
