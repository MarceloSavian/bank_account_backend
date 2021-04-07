import { MovementTypeModel } from '@/domain/models/movementType'

export const mockMovementTypeIn = (): MovementTypeModel => ({
  id: 'any_id',
  name: 'any_name',
  type: 'in'
})

export const mockMovementTypeOut = (): MovementTypeModel => ({
  id: 'any_id',
  name: 'any_name',
  type: 'out'
})
