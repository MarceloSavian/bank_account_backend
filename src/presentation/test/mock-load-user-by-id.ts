import { UserModel } from '@/domain/models/user'
import { mockUserModel } from '@/domain/test'
import { LoadUserById } from '@/domain/usecases/user/load-user-by-id'

export const mockLoadUserById = (): LoadUserById => {
  class LoadUserByIdStub implements LoadUserById {
    async loadById (): Promise<UserModel | null> {
      return mockUserModel()
    }
  }
  return new LoadUserByIdStub()
}
