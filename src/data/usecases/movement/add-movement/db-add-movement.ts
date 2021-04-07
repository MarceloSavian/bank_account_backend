import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { AddMovement, MovementParams } from '@/domain/usecases/movement/add-movement'

export class DbAddMovement implements AddMovement {
  constructor (
    private readonly addMovementRepository: AddMovementRepository
  ) {}

  async add (movementData: MovementParams): Promise<null | Error> {
    await this.addMovementRepository.add(movementData)
    return null
  }
}
