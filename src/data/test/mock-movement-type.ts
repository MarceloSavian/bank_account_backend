import { MovementTypeModel } from '@/domain/models/movementType'
import { mockMovementTypeIn } from '@/domain/test/mock-movement-type'
import { GetMovementTypeRepository } from '../protocols/db/movementType/GetMovementTypeRepository'

export const mockGetMovementTypeRepository = (): GetMovementTypeRepository => {
  class GetMovementTypeRepositoryStub implements GetMovementTypeRepository {
    async getById (): Promise<MovementTypeModel> {
      return mockMovementTypeIn()
    }
  }
  return new GetMovementTypeRepositoryStub()
}
