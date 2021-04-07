import { SessionModel } from '@/domain/models/session'

export interface LoadSessionByTokenRepository {
  loadByToken: (token: string) => Promise<SessionModel | null>
}
