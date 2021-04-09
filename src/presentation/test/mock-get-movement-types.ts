import { MovementTypeModel } from '@/domain/models/movementType'
import { mockMovementTypeIn, mockMovementTypeOut } from '@/domain/test/mock-movement-type'
import { GetMovementTypes } from '@/domain/usecases/movementTypes/get-movement-types'

export const mockGetMovementTypes = (): GetMovementTypes => {
  class GetMovementTypesStub implements GetMovementTypes {
    async get (): Promise<MovementTypeModel[] | null> {
      return [mockMovementTypeIn(), mockMovementTypeIn(), mockMovementTypeOut()]
    }
  }
  return new GetMovementTypesStub()
}
