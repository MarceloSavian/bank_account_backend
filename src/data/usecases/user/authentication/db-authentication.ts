import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashCompare } from '@/data/protocols/criptography/hash-comparer'
import { AddSessionRepository } from '@/data/protocols/db/session/add-session-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { Authentication, AuthenticationParams, AuthenticationResponse } from '@/domain/usecases/user/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly addSessionRepository: AddSessionRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationResponse | null> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authentication.email)

    if (!user) return null

    const hash = await this.hashCompare.compare(authentication.password, user.password)

    if (!hash) return null

    const token = await this.encrypter.encrypt({ id: user.id }, '24h')// Token com expiração de 24h

    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + 1)

    await this.addSessionRepository.add(token, expiresIn, user.id)

    return { user, token }
  }
}
