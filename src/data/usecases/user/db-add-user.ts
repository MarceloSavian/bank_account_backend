import { Hasher } from '@/data/protocols/criptography/hasher'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { AddUser, AddUserParams, AddUserResolve } from '@/domain/usecases/user/add-user'
import { EmailInUseError } from '@/presentation/errors'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) { }

  async add (user: AddUserParams): Promise<AddUserResolve> {
    const searchUser = await this.loadUserByEmailRepository.loadByEmail(user.email)
    if (searchUser) return { error: new EmailInUseError() }

    await this.hasher.hash(user.password)
    return { user: { ...user, id: '1' } }
  }
}
