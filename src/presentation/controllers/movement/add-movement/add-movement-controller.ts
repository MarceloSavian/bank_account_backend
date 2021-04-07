import { AddMovement } from '@/domain/usecases/movement/add-movement'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddMovementController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addMovement: AddMovement
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      const { accountId, movementType, value } = httpRequest.body

      const add = await this.addMovement.add({
        accountId,
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
