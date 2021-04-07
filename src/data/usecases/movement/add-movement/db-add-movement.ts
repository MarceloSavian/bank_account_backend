import { GetAccountRepository } from '@/data/protocols/db/account/get-account-repository'
import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { GetMovementTypeRepository } from '@/data/protocols/db/movementType/GetMovementTypeRepository'
import { AddMovement, MovementParams } from '@/domain/usecases/movement/add-movement'
import { InvalidParamError } from '@/presentation/errors'

export class DbAddMovement implements AddMovement {
  constructor (
    private readonly addMovementRepository: AddMovementRepository,
    private readonly getAccountRepository: GetAccountRepository,
    private readonly getMovementTypeRepository: GetMovementTypeRepository
  ) {}

  async add (movementData: MovementParams): Promise<null | Error> {
    const account = await this.getAccountRepository.getById(movementData.accountId)

    if (!account) return new InvalidParamError('accountId')

    await this.getMovementTypeRepository.getById(movementData.movementType)
    await this.addMovementRepository.add(movementData)
    return null
  }
}
