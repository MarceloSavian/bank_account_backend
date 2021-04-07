import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  },
  async verify (): Promise<string> {
    return 'any_value'
  }
}))

type SutTypes = {
  sut: JwtAdapter
  secret: string
}

const mockSut = (): SutTypes => {
  const secret = 'secret'
  const sut = new JwtAdapter('secret')

  return {
    sut,
    secret
  }
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call Jwt sign with correct values', async () => {
      const { sut, secret } = mockSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, secret)
    })
    test('Should return a token on sign success', async () => {
      const { sut } = mockSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })
    test('Should throw if sign thorws', async () => {
      const { sut } = mockSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
