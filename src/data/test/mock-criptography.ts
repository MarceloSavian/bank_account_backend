import { Decrypter } from '../protocols/criptography/decrypter'
import { Encrypter } from '../protocols/criptography/encrypter'
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

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (): Promise<string | object | null> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}
