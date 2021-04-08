import { AccountModel } from '@/domain/models/account'

export interface GetAccountByUserId {
  get: (userId: string) => Promise<AccountModel | null>
}
