import { SessionModel } from '../models/session'

export const mockSessionModel = (): SessionModel => ({
  id: 'any_id',
  token: 'any_token',
  expireAt: new Date(),
  userId: 'any_id'
})
