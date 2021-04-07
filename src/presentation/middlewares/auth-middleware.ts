
import { LoadSessionByToken } from '@/domain/usecases/session/load-session-by-token'
import { LoadUserById } from '@/domain/usecases/user/load-user-by-id'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadSessionByToken: LoadSessionByToken,
    private readonly loadUserById: LoadUserById,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (!accessToken) return forbidden(new AccessDeniedError())

      const session = await this.loadSessionByToken.load(httpRequest.headers['x-access-token'])
      if (!session) return forbidden(new AccessDeniedError())

      if (session.expireAt < new Date()) return forbidden(new AccessDeniedError())

      const user = await this.loadUserById.loadById(session.userId)
      if (!user) return forbidden(new AccessDeniedError())

      if (this.role) {
        if (!user.roles.includes(this.role)) return forbidden(new AccessDeniedError())
      }

      return ok({ userId: user.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
