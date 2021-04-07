import { SessionModel } from '@/domain/models/session'
import { AddSessionRepository } from '../protocols/db/session/add-session-repository'
import { LoadSessionByTokenRepository } from '../protocols/db/session/load-session-by-token'
import { mockSessionModel } from '@/domain/test/mock-session'

export const mockAddSessionRepository = (): AddSessionRepository => {
  class AddSessionRepositoryStub implements AddSessionRepository {
    async add (): Promise<void> {}
  }
  return new AddSessionRepositoryStub()
}

export const mockLoadSessionByTokenRepository = (): LoadSessionByTokenRepository => {
  class LoadSessionByTokenRepositoryStub implements LoadSessionByTokenRepository {
    async loadByToken (): Promise<SessionModel | null> {
      return mockSessionModel()
    }
  }
  return new LoadSessionByTokenRepositoryStub()
}
