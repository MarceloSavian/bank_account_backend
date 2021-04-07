export interface AddAccountRepository {
  add: (userId: string, balance: number) => Promise<void>
}
