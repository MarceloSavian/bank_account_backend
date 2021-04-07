import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashCompare } from '@/data/protocols/criptography/hash-comparer'
import { AddSessionRepository } from '@/data/protocols/db/session/add-session-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { mockEncrypter, mockHashCompare, mockAddSessionRepository, mockLoadUserByEmailRepository } from '@/data/test'
import { mockAuthenticationParams, mockUserModel } from '@/domain/test'
import { DbAuthentication } from './db-authentication'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashCompareStub: HashCompare
  encrypterStub: Encrypter
  addSessionRepositoryStub: AddSessionRepository
}

const mockSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const hashCompareStub = mockHashCompare()
  const encrypterStub = mockEncrypter()
  const addSessionRepositoryStub = mockAddSessionRepository()
  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    addSessionRepositoryStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    addSessionRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
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
    expect(loadSpy).toBeCalledWith({ id: mockUserModel().id }, '24h')
  })
  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = mockSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddSessionRepository with correct values', async () => {
    const { sut, addSessionRepositoryStub } = mockSut()
    const updateSpy = jest.spyOn(addSessionRepositoryStub, 'add')
    const date = new Date()
    date.setDate(date.getDate() + 1)
    await sut.auth(mockAuthenticationParams())
    expect(updateSpy).toBeCalledWith('any_token', date, mockUserModel().id)
  })
})
