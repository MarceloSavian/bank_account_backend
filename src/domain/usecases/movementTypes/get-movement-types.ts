import { MovementTypeModel } from '@/domain/models/movementType'

export interface GetMovementTypes {
  get: () => Promise<null | MovementTypeModel[]>
}
