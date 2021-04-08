import { DbGetAccountByUserId } from '@/data/usecases/account/get-account-by-user-id/db-get-account-by-user-id'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeGetAccountByUserID = (): DbGetAccountByUserId => {
  const accountMongoRepository = new AccountMongoRepository()
  const getAccountByUserID = new DbGetAccountByUserId(accountMongoRepository)
  return getAccountByUserID
}
