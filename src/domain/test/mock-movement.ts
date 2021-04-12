import { MovementParamsRepo } from '@/data/protocols/db/movement/add-movement-repository'
import { MovementModel } from '../models/movement'
import { MovementParams } from '../usecases/movement/add-movement'

export const mockMovementParams = (): MovementParams => ({
  value: 20,
  date: new Date(),
  accountId: 'any_id',
  movementType: 'any_id'
})

export const mockMovementModel = (): MovementModel => ({
  id: 'any_id',
  value: 20,
  date: new Date(),
  accountId: 'any_id',
  balance: 20,
  movementType: {
    id: 'any_id',
    name: 'any_name',
    type: 'in'
  }
})

export const mockMovementParamsRepo = (): MovementParamsRepo => ({
  ...mockMovementParams(),
  balance: 20
})
