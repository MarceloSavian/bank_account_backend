import { MovementTypeModel } from '@/domain/models/movementType'

export interface GetMovementTypeRepository {
  getById: (id: string) => Promise<MovementTypeModel | null>
}
