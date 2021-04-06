import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashCompare } from '@/data/protocols/criptography/hash-comparer'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { Authentication, AuthenticationParams, AuthenticationResponse } from '@/domain/usecases/user/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationResponse | null> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authentication.email)

    if (!user) return null

    const hash = await this.hashCompare.compare(authentication.password, user.password)

    if (!hash) return null

    const token = await this.encrypter.encrypt(user.id)

    return { user, token }
  }
}
