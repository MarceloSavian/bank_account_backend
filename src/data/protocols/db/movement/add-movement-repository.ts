export type MovementParamsRepo = {
  value: number
  date: Date
  accountId: string
  movementType: string
  balance: number
}

export interface AddMovementRepository {
  add: (movementData: MovementParamsRepo) => Promise<void>
}
