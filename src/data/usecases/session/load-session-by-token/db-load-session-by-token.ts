import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadSessionByTokenRepository } from '@/data/protocols/db/session/load-session-by-token'
import { SessionModel } from '@/domain/models/session'
import { LoadSessionByToken } from '@/domain/usecases/session/load-session-by-token'

export class DbLoadSessionByToken implements LoadSessionByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadSessionByTokenRepository: LoadSessionByTokenRepository
  ) {}

  async load (accessToken: string): Promise<SessionModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) return null

    const session = await this.loadSessionByTokenRepository.loadByToken(accessToken)
    return session
  }
}
