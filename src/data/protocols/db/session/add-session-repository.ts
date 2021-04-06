export interface AddSessionRepository {
  add: (token: string, expireAt: Date, id: string) => Promise<void>
}
