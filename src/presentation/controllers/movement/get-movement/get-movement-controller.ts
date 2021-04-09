import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'
import { GetMovements } from '@/domain/usecases/movement/get-movements'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class GetMovementController implements Controller {
  constructor (
    private readonly getAccountByUserId: GetAccountByUserId,
    private readonly getMovements: GetMovements
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest

      const account = await this.getAccountByUserId.get(String(userId))

      if (!account) return badRequest(new InvalidParamError('userId'))

      const movements = await this.getMovements.get(account.id)

      return ok(movements)
    } catch (error) {
      return serverError(error)
    }
  }
}
