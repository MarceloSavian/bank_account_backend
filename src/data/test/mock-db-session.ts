import { AddSessionRepository } from '../protocols/db/session/add-session-repository'

export const mockAddSessionRepository = (): AddSessionRepository => {
  class AddSessionRepositoryStub implements AddSessionRepository {
    async add (): Promise<void> {}
  }
  return new AddSessionRepositoryStub()
}
