import { AddUserParams } from '../usecases/user/add-user'
import { UserModel } from '../models/user'
import { AuthenticationParams } from '../usecases/user/authentication'

export const mockUserParams = (): AddUserParams => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
  roles: ['any_role']
})

export const mockUserModel = (): UserModel => ({
  id: 'any_id',
  ...mockUserParams()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
