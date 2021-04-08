import { GetAccountByUserIdRepository } from '@/data/protocols/db/account/get-account-by-user-id-repository'
import { AccountModel } from '@/domain/models/account'
import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'

export class DbGetAccountByUserId implements GetAccountByUserId {
  constructor (
    private readonly getAccountByUserIdRepository: GetAccountByUserIdRepository
  ) {}

  async get (userId: string): Promise<AccountModel | null> {
    return await this.getAccountByUserIdRepository.getByUserId(userId)
  }
}
