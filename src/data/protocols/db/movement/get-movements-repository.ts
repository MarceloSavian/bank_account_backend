import { MovementModel } from '@/domain/models/movement'

export interface GetMovementsRepository {
  getAll: (limit: number) => Promise<MovementModel[] | null>
}
