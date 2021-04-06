export interface AddSessionRepository {
  add: (token: string, expireAt: Date) => Promise<void>
}
