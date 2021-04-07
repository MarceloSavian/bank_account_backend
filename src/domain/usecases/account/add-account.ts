export interface AddAccount {
  add: (user_id: string) => Promise<void>
}
