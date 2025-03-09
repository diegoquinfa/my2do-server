import { JwtPayload, sign } from 'jsonwebtoken'
import { ENV } from './env'

const createJWT = (payload: JwtPayload): string => {
  const token = sign(payload, ENV.JWT_SECRET, { expiresIn: '24h' })

  return token
}

export const jwt = { createJWT }
