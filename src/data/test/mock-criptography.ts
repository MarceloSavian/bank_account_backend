import { HashCompare } from '../protocols/criptography/hash-comparer'
import { Hasher } from '../protocols/criptography/hasher'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (): Promise<string> {
      return 'hashed_value'
    }
  }
  return new HasherStub()
}

export const mockHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashCompareStub()
}
