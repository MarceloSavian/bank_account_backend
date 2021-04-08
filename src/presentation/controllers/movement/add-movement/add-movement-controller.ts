import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'
import { AddMovement } from '@/domain/usecases/movement/add-movement'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddMovementController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addMovement: AddMovement,
    private readonly getAccountByUserId: GetAccountByUserId
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      const { movementType, value } = httpRequest.body
      const { userId } = httpRequest

      const account = await this.getAccountByUserId.get(String(userId))

      if (!account) return badRequest(new InvalidParamError('userId'))

      const add = await this.addMovement.add({
        accountId: account.id,
        movementType,
        value,
        date: new Date()
      })

      if (add) return badRequest(add)

      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
