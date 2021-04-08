export interface UpdateAccountRepository {
  update: (id: string, balance: number) => Promise<void>
}
