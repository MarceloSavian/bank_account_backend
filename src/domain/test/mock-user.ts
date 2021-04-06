import { AddUserParams } from '../usecases/user/add-user'
import { UserModel } from '../models/user'

export const mockUserParams = (): AddUserParams => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

export const mockUserModel = (): UserModel => ({
  id: 'any_id',
  ...mockUserParams()
})
