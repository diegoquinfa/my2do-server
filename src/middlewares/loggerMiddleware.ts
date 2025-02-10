import pino, { Options } from 'pino-http'
import { IncomingMessage, ServerResponse } from 'node:http'
import { ENV } from '@/lib/env'

const pinoConfig: Options = {
  customLogLevel: (_: IncomingMessage, res: ServerResponse, err?: Error) => {
    if (err || res.statusCode >= 500) return 'error'
    if (res.statusCode >= 400) return 'warn'
    return 'info'
  }
}

if (ENV.NODE_ENV !== 'production') {
  pinoConfig.transport = { target: 'pino-pretty' }

  pinoConfig.customSuccessMessage = (req: IncomingMessage, res: ServerResponse) => {
    return `✔  ${req.url} ${req.method} ${res.statusCode} - ${res.getHeader('content-length') || 0} bytes`
  }

  pinoConfig.customErrorMessage = (req: IncomingMessage, res: ServerResponse, err?: Error) => {
    return `✖  ERROR ${req.url} ${req.method} ${res.statusCode} - ${err?.message || 'Unknown error'}`
  }
}

export const loggerMiddleware = pino(pinoConfig)
