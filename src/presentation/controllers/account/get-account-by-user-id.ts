import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class GetAccountByUserIdController implements Controller {
  constructor (
    private readonly getAccountByUserId: GetAccountByUserId
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest

      const account = await this.getAccountByUserId.get(String(userId))

      if (!account) return badRequest(new InvalidParamError('userId'))

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
