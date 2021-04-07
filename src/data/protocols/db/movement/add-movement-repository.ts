import { MovementParams } from '@/domain/usecases/movement/add-movement'

export interface AddMovementRepository {
  add: (movementData: MovementParams) => Promise<void>
}
