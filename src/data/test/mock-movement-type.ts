import { MovementTypeModel } from '@/domain/models/movementType'
import { mockMovementTypeIn, mockMovementTypeOut } from '@/domain/test/mock-movement-type'
import { GetMovementTypeRepository } from '../protocols/db/movementType/get-movement-type-repository'
import { GetMovementTypesRepository } from '../protocols/db/movementType/get-movement-types-repository'

export const mockGetMovementTypeRepository = (): GetMovementTypeRepository => {
  class GetMovementTypeRepositoryStub implements GetMovementTypeRepository {
    async getById (): Promise<MovementTypeModel | null> {
      return mockMovementTypeIn()
    }
  }
  return new GetMovementTypeRepositoryStub()
}

export const mockGetMovementTypesRepository = (): GetMovementTypesRepository => {
  class GetMovementTypesRepositoryStub implements GetMovementTypesRepository {
    async getAll (): Promise<MovementTypeModel[] | null> {
      return [mockMovementTypeIn(), mockMovementTypeIn(), mockMovementTypeOut()]
    }
  }
  return new GetMovementTypesRepositoryStub()
}
