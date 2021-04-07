import { mockUserModel } from '@/domain/test'
import { Authentication, AuthenticationResponse } from '@/domain/usecases/user/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (): Promise<AuthenticationResponse> {
      return { token: 'any_token', user: mockUserModel() }
    }
  }
  return new AuthenticationStub()
}
