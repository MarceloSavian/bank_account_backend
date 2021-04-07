import { AddAccount } from '@/domain/usecases/account/add-account'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (): Promise<void> {}
  }
  return new AddAccountStub()
}
