import { UserModel } from '@/domain/models/user'
import { mockUserModel } from '@/domain/test'
import { LoadUserByEmailRepository } from '../protocols/db/user/load-user-by-email-repository'

export const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (): Promise<UserModel | null> {
      return mockUserModel()
    }
  }
  return new LoadUserByEmailRepositoryStub()
}
