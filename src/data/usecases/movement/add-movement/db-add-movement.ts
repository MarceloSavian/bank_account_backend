import { GetAccountRepository } from '@/data/protocols/db/account/get-account-repository'
import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { AddMovement, MovementParams } from '@/domain/usecases/movement/add-movement'

export class DbAddMovement implements AddMovement {
  constructor (
    private readonly addMovementRepository: AddMovementRepository,
    private readonly getAccountRepository: GetAccountRepository
  ) {}

  async add (movementData: MovementParams): Promise<null | Error> {
    await this.getAccountRepository.getById(movementData.accountId)
    await this.addMovementRepository.add(movementData)
    return null
  }
}
