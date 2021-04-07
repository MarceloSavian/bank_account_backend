import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddAccount } from '@/domain/usecases/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (userId: string): Promise<void> {
    await this.addAccountRepository.add(userId, 0)
  }
}
