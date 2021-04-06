import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddUser, AddUserParams, AddUserResolve } from '@/domain/usecases/user/add-user'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher
  ) { }

  async add (user: AddUserParams): Promise<AddUserResolve> {
    await this.hasher.hash(user.password)
    return { user: { ...user, id: '1' } }
  }
}
