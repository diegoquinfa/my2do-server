import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { ENV } from './env'

const createJWT = (payload: JwtPayload): string => {
  const token = sign(payload, ENV.JWT_SECRET, { expiresIn: '24h' })

  return token
}

const verifyJWT = (token: string): JwtPayload | string | null => {
  try {
    const decoded = verify(token, ENV.JWT_SECRET)

    return decoded
  } catch {
    return null
  }
}

export const jwt = { createJWT, verifyJWT }
