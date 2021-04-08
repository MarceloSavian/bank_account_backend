import { AccountModel } from '@/domain/models/account'

export interface GetAccountByUserIdRepository {
  getByUserId: (userId: string) => Promise<AccountModel | null>
}
