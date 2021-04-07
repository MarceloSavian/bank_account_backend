import { LoadUserByIdRepository } from '@/data/protocols/db/account/load-user-by-id-repository'
import { UserModel } from '@/domain/models/user'
import { LoadUserById } from '@/domain/usecases/user/load-user-by-id'

export class DbLoadUserById implements LoadUserById {
  constructor (
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) {}

  async loadById (id: string): Promise<UserModel | null> {
    return await this.loadUserByIdRepository.loadById(id)
  }
}
