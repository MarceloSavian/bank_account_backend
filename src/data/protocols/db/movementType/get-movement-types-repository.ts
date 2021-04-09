import { MovementTypeModel } from '@/domain/models/movementType'

export interface GetMovementTypesRepository {
  getAll: () => Promise<MovementTypeModel[] | null>
}
