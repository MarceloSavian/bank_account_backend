import { MovementParams } from '../usecases/movement/add-movement'

export const mockMovementParams = (): MovementParams => ({
  value: 20,
  date: new Date(),
  accountId: 'any_id',
  movementType: 'any_id'
})
