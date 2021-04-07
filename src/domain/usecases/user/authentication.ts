import { UserModel } from '@/domain/models/user'

export type AuthenticationParams = {
  email: string
  password: string
}

export type AuthenticationResponse = {
  user: UserModel
  token: string
}

export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationResponse | null>
}
