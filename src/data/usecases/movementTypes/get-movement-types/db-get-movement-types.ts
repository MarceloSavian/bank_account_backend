import { GetMovementTypesRepository } from '@/data/protocols/db/movementType/get-movement-types-repository'
import { MovementTypeModel } from '@/domain/models/movementType'
import { GetMovementTypes } from '@/domain/usecases/movementTypes/get-movement-types'

export class DbGetMovementTypes implements GetMovementTypes {
  constructor (
    private readonly getMovementTypesRepository: GetMovementTypesRepository
  ) {}

  async get (): Promise<null | MovementTypeModel[]> {
    return await this.getMovementTypesRepository.getAll()
  }
}
