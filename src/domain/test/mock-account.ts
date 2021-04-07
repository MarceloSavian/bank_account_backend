import { AccountModel } from '../models/account'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  userId: 'any_id',
  balance: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})
