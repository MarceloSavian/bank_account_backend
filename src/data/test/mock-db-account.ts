import { AddAccountRepository } from '../protocols/db/account/add-account-repository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (): Promise<void> {}
  }
  return new AddAccountRepositoryStub()
}
