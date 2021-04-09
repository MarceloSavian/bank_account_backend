import { MovementModel } from '@/domain/models/movement'

export interface GetMovements {
  get: (accountId: string) => Promise<MovementModel[] | null>
}
