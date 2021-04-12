import { MovementTypeModel } from './movementType'

export type MovementModel = {
  id: string
  value: number
  date: Date
  accountId: string
  movementType: MovementTypeModel
  balance: number
}
