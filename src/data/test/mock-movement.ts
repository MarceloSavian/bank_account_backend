import { MovementModel } from '@/domain/models/movement'
import { mockMovementModel } from '@/domain/test/mock-movement'
import { AddMovementRepository } from '../protocols/db/movement/add-movement-repository'
import { GetMovementsRepository } from '../protocols/db/movement/get-movements-repository'

export const mockAddMovementRepository = (): AddMovementRepository => {
  class AddMovementRepositoryStub implements AddMovementRepository {
    async add (): Promise<void> {}
  }
  return new AddMovementRepositoryStub()
}

export const mockGetMovementsRepository = (): GetMovementsRepository => {
  class GetMovementsRepositoryStub implements GetMovementsRepository {
    async getAll (): Promise<MovementModel[] | null> {
      return [mockMovementModel()]
    }
  }
  return new GetMovementsRepositoryStub()
}
