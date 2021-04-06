import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashCompare } from '@/data/protocols/criptography/hash-comparer'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { mockEncrypter, mockHashCompare } from '@/data/test'
import { mockLoadUserByEmailRepository } from '@/data/test/mock-db-user'
import { mockAuthenticationParams, mockUserModel } from '@/domain/test'
import { DbAuthentication } from './db-authentication'

  type SutTypes = {
    sut: DbAuthentication
    loadUserByEmailRepositoryStub: LoadUserByEmailRepository
    hashCompareStub: HashCompare
    encrypterStub: Encrypter
  }

const mockSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const hashCompareStub = mockHashCompare()
  const encrypterStub = mockEncrypter()
  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = mockSut()
    const loadSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockAuthenticationParams())
    expect(loadSpy).toBeCalledWith(mockAuthenticationParams().email)
  })
  test('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValue(null)
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe(null)
  })
  test('Should call HashComparer with correct values', async () => {
    const { sut, hashCompareStub } = mockSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockAuthenticationParams())
    expect(compareSpy).toBeCalledWith(mockAuthenticationParams().password, mockUserModel().password)
  })
  test('Should throw if HashComparer throws', async () => {
    const { sut, hashCompareStub } = mockSut()
    jest.spyOn(hashCompareStub, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashCompareStub } = mockSut()
    jest.spyOn(hashCompareStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe(null)
  })
  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = mockSut()
    const loadSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthenticationParams())
    expect(loadSpy).toBeCalledWith(mockUserModel().id)
  })
})
