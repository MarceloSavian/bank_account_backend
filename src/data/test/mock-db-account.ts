import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test/mock-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { GetAccountRepository } from '../protocols/db/account/get-account-repository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (): Promise<void> {}
  }
  return new AddAccountRepositoryStub()
}

export const mockGetAccountRepository = (): GetAccountRepository => {
  class GetAccountRepositoryStub implements GetAccountRepository {
    async getById (): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new GetAccountRepositoryStub()
}
