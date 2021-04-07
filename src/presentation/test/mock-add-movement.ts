import { AddMovement } from '@/domain/usecases/movement/add-movement'

export const mockAddMovement = (): AddMovement => {
  class AddMovementStub implements AddMovement {
    async add (): Promise<null | Error> {
      return null
    }
  }
  return new AddMovementStub()
}
