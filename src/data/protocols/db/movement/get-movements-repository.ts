import { MovementModel } from '@/domain/models/movement'

export interface GetMovementsRepository {
  getAll: (accountId: string, limit: number) => Promise<MovementModel[] | null>
}
