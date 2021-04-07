import { AddMovementRepository } from '../protocols/db/movement/add-movement-repository'

export const mockAddMovementRepository = (): AddMovementRepository => {
  class AddMovementRepositoryStub implements AddMovementRepository {
    async add (): Promise<void> {}
  }
  return new AddMovementRepositoryStub()
}
