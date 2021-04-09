import { MovementModel } from '@/domain/models/movement'

export interface GetMovementsRepository {
  getAll: () => Promise<MovementModel[] | null>
}
