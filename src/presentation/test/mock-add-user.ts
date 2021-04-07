import { mockUserModel } from '@/domain/test'
import { AddUser, AddUserResolve } from '@/domain/usecases/user/add-user'

export const mockAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (): Promise<AddUserResolve> {
      return await Promise.resolve({ user: mockUserModel() })
    }
  }
  return new AddUserStub()
}
