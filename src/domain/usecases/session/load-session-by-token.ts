import { SessionModel } from '@/domain/models/session'

export interface LoadSessionByToken {
  load: (token: string) => Promise<SessionModel | null>
}
