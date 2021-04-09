import { GetAccountRepository } from '@/data/protocols/db/account/get-account-repository'
import { UpdateAccountRepository } from '@/data/protocols/db/account/update-account-repository'
import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { GetMovementTypeRepository } from '@/data/protocols/db/movementType/get-movement-type-repository'
import { AddMovement, MovementParams } from '@/domain/usecases/movement/add-movement'
import { InvalidParamError } from '@/presentation/errors'

export class DbAddMovement implements AddMovement {
  constructor (
    private readonly addMovementRepository: AddMovementRepository,
    private readonly getAccountRepository: GetAccountRepository,
    private readonly getMovementTypeRepository: GetMovementTypeRepository,
    private readonly updateAccountRepository: UpdateAccountRepository
  ) {}

  async add (movementData: MovementParams): Promise<null | Error> {
    const account = await this.getAccountRepository.getById(movementData.accountId)

    if (!account) return new InvalidParamError('accountId')

    const movementType = await this.getMovementTypeRepository.getById(movementData.movementType)

    if (!movementType) return new InvalidParamError('movementType')

    if (movementType.type === 'out' && movementData.value > account.balance) return new InvalidParamError('value')

    let accountBalance = movementData.value + account.balance

    if (movementType.type === 'out') accountBalance = account.balance - movementData.value

    await this.updateAccountRepository.update(movementData.accountId, accountBalance)
    await this.addMovementRepository.add(movementData)
    return null
  }
}
