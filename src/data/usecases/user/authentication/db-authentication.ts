import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { Authentication, AuthenticationParams, AuthenticationResponse } from '@/domain/usecases/user/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationResponse | null> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authentication.email)

    if (!user) return null

    return { user, token: '' }
  }
}
