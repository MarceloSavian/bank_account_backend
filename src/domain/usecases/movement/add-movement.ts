
export type MovementParams = {
  value: number
  date: Date
  accountId: string
  movementType: string
}

export interface AddMovement {
  add: (movementData: MovementParams) => Promise<null | Error>
}
