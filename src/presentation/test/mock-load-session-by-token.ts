import { SessionModel } from '@/domain/models/session'
import { mockSessionModel } from '@/domain/test/mock-session'
import { LoadSessionByToken } from '@/domain/usecases/session/load-session-by-token'

export const mockLoadSessionByToken = (): LoadSessionByToken => {
  class LoadSessionByTokenStub implements LoadSessionByToken {
    async load (): Promise<SessionModel | null> {
      return mockSessionModel()
    }
  }
  return new LoadSessionByTokenStub()
}
