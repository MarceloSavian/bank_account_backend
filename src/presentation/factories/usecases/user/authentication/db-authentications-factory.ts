import { DbAuthentication } from '@/data/usecases/user/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/user/authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { SessionMongoRepository } from '@/infra/db/mongodb/session/session-mongo-repository'
import { UserMongoRepository } from '@/infra/db/mongodb/user/user-mongo-repository'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const userMongoRepository = new UserMongoRepository()
  const sessionMongoRepository = new SessionMongoRepository()
  return new DbAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter, sessionMongoRepository)
}
