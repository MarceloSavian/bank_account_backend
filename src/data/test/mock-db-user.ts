import { UserModel } from '@/domain/models/user'
import { mockUserModel } from '@/domain/test'
import { AddUserRepository } from '../protocols/db/user/add-user-repository'
import { LoadUserByEmailRepository } from '../protocols/db/user/load-user-by-email-repository'

export const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (): Promise<UserModel | null> {
      return mockUserModel()
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

export const mockAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add (): Promise<UserModel> {
      return await Promise.resolve(mockUserModel())
    }
  }
  return new AddUserRepositoryStub()
}
