import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { AddUser, AddUserParams, AddUserResolve } from '@/domain/usecases/user/add-user'
import { EmailInUseError } from '@/presentation/errors'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly addUserRepository: AddUserRepository
  ) { }

  async add (userData: AddUserParams): Promise<AddUserResolve> {
    const searchUser = await this.loadUserByEmailRepository.loadByEmail(userData.email)
    if (searchUser) return { error: new EmailInUseError() }

    const newPassword = await this.hasher.hash(userData.password)
    const user = await this.addUserRepository.add({ ...userData, password: newPassword })
    return { user }
  }
}
