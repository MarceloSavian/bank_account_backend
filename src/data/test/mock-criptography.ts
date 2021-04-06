import { Hasher } from '../protocols/criptography/hasher'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (): Promise<string> {
      return 'hashed_value'
    }
  }
  return new HasherStub()
}
