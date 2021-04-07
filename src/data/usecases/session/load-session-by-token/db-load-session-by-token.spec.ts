import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadSessionByTokenRepository } from '@/data/protocols/db/session/load-session-by-token'
import { mockDecrypter, mockLoadSessionByTokenRepository } from '@/data/test'
import { DbLoadSessionByToken } from './db-load-session-by-token'

type SutTypes = {
  sut: DbLoadSessionByToken
  decrypterStub: Decrypter
  loadSessionByTokenRepositoryStub: LoadSessionByTokenRepository
}

const mockSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadSessionByTokenRepositoryStub = mockLoadSessionByTokenRepository()
  return {
    sut: new DbLoadSessionByToken(decrypterStub, loadSessionByTokenRepositoryStub),
    decrypterStub,
    loadSessionByTokenRepositoryStub
  }
}

describe('DbLoadAccountByTokent UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = mockSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenLastCalledWith('any_token')
  })
  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = mockSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const accounnt = await sut.load('any_token')
    expect(accounnt).toBeNull()
  })
  test('Should call LoadSessionByTokenRepository with correct values', async () => {
    const { sut, loadSessionByTokenRepositoryStub } = mockSut()
    const loadByTokenSpy = jest.spyOn(loadSessionByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token')
    expect(loadByTokenSpy).toHaveBeenLastCalledWith('any_token')
  })
  test('Should return null if LoadSessionByTokenRepository returns null', async () => {
    const { sut, loadSessionByTokenRepositoryStub } = mockSut()
    jest.spyOn(loadSessionByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const accounnt = await sut.load('any_token')
    expect(accounnt).toBeNull()
  })
  test('Should throws if Decrypter throws', async () => {
    const { sut, decrypterStub } = mockSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.load('any_token')
    await expect(promise).rejects.toThrow()
  })

  test('Should throws if LoadSessionByTokenRepository throws', async () => {
    const { sut, loadSessionByTokenRepositoryStub } = mockSut()
    jest.spyOn(loadSessionByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.load('any_token')
    await expect(promise).rejects.toThrow()
  })
})
