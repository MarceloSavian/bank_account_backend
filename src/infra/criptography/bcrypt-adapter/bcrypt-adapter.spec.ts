import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

type SutTypes = {
  sut: BcryptAdapter
  salt: number
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  },
  async compare (): Promise<boolean> {
    return true
  }
}))

const mockSut = (): SutTypes => {
  const salt = 12
  return {
    sut: new BcryptAdapter(salt),
    salt
  }
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async () => {
      const { sut, salt } = mockSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
    test('Should return a hash on success', async () => {
      const { sut } = mockSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })
    test('Should throws if hash throw', async () => {
      const { sut } = mockSut()
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
