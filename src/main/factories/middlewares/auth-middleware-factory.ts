import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadSessionByToken } from '../usecases/session/load-session-by-token/load-session-by-token-repository'
import { makeDbLoadUserByIdFactory } from '../usecases/user/load-user-by-id/load-user-by-id-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadSessionByToken(), makeDbLoadUserByIdFactory(), role)
}
