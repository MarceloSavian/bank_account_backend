import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test/mock-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { GetAccountByUserIdRepository } from '../protocols/db/account/get-account-by-user-id-repository'
import { GetAccountRepository } from '../protocols/db/account/get-account-repository'
import { UpdateAccountRepository } from '../protocols/db/account/update-account-repository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (): Promise<void> {}
  }
  return new AddAccountRepositoryStub()
}

export const mockGetAccountRepository = (): GetAccountRepository => {
  class GetAccountRepositoryStub implements GetAccountRepository {
    async getById (): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new GetAccountRepositoryStub()
}

export const mockUpdateAccountRepository = (): UpdateAccountRepository => {
  class UpdateAccountRepositoryStub implements UpdateAccountRepository {
    async update (): Promise<void> {}
  }
  return new UpdateAccountRepositoryStub()
}

export const mockGetAccountByUserIdRepository = (): GetAccountByUserIdRepository => {
  class GetAccountByUserIdRepositoryStub implements GetAccountByUserIdRepository {
    async getByUserId (): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new GetAccountByUserIdRepositoryStub()
}
