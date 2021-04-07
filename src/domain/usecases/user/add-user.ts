import { UserModel } from '@/domain/models/user'

export type AddUserParams = {
  name: string
  email: string
  password: string
  roles: string[]
}

export type AddUserResolve = {
  user?: UserModel
  error?: Error
}

export interface AddUser {
  add: (user: AddUserParams) => Promise<AddUserResolve>
}
