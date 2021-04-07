import { AccountModel } from '@/domain/models/account'

export interface GetAccountRepository {
  getById: (id: string) => Promise<AccountModel | null>
}
