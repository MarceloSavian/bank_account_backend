import { MovementModel } from '@/domain/models/movement'

export interface GetMovements {
  get: () => Promise<MovementModel[] | null>
}
