import { GetMovementTypes } from '@/domain/usecases/movementTypes/get-movement-types'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class GetMovementTypesController implements Controller {
  constructor (
    private readonly getMovementTypes: GetMovementTypes
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const movementTypes = await this.getMovementTypes.get()

      return ok(movementTypes)
    } catch (error) {
      return serverError(error)
    }
  }
}
