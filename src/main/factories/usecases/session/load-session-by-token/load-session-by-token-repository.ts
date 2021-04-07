import { DbLoadSessionByToken } from '@/data/usecases/session/load-session-by-token/db-load-session-by-token'
import { LoadSessionByToken } from '@/domain/usecases/session/load-session-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { SessionMongoRepository } from '@/infra/db/mongodb/session/session-mongo-repository'
import env from '@/main/config/env'

export const makeDbLoadSessionByToken = (): LoadSessionByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const SessionRepository = new SessionMongoRepository()
  return new DbLoadSessionByToken(jwtAdapter, SessionRepository)
}
