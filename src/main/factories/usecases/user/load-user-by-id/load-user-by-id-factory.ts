import { DbLoadUserById } from '@/data/usecases/user/load-user-by-id/db-load-account-by-token'
import { LoadUserById } from '@/domain/usecases/user/load-user-by-id'
import { UserMongoRepository } from '@/infra/db/mongodb/user/user-mongo-repository'

export const makeDbLoadUserByIdFactory = (): LoadUserById => {
  const UserRepository = new UserMongoRepository()
  return new DbLoadUserById(UserRepository)
}
