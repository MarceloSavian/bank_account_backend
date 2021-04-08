import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test/mock-account'
import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'

export const mockGetAccountByUserId = (): GetAccountByUserId => {
  class GetAccountByUserIdStub implements GetAccountByUserId {
    async get (): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new GetAccountByUserIdStub()
}
