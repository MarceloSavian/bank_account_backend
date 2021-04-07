import { UserModel } from '@/domain/models/user'

export interface LoadUserById {
  loadById: (id: string) => Promise<UserModel | null>
}
