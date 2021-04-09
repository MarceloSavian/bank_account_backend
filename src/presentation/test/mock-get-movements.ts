import { MovementModel } from '@/domain/models/movement'
import { mockMovementModel } from '@/domain/test/mock-movement'
import { GetMovements } from '@/domain/usecases/movement/get-movements'

export const mockGetMovements = (): GetMovements => {
  class GetMovementsStub implements GetMovements {
    async get (): Promise<MovementModel[] | null> {
      return [mockMovementModel()]
    }
  }
  return new GetMovementsStub()
}
