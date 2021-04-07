import { DbAddUser } from '@/data/usecases/user/add-user/db-add-user'
import { AddUser } from '@/domain/usecases/user/add-user'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { UserMongoRepository } from '@/infra/db/mongodb/user/user-mongo-repository'

export const makeDbAddUser = (): AddUser => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const userRepository = new UserMongoRepository()
  return new DbAddUser(hasher, userRepository, userRepository)
}
