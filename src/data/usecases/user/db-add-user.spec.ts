import { DbAddUser } from './db-add-user'
import { mockUserModel, mockUserParams } from '@/domain/test'
import { mockHasher } from '@/data/test'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { mockLoadUserByEmailRepository } from '@/data/test/mock-db-user'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { EmailInUseError } from '@/presentation/errors'

type SutTypes = {
  sut: DbAddUser
  hasherStub: Hasher
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValue(null)
  return {
    sut: new DbAddUser(hasherStub, loadUserByEmailRepositoryStub),
    hasherStub,
    loadUserByEmailRepositoryStub
  }
}

describe('DbAddUser UseCase', () => {
  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = mockSut()
    const loadSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockUserParams())
    expect(loadSpy).toBeCalledWith(mockUserParams().email)
  })
  test('Should return error if LoadUserByEmailRepository returns an account', async () => {
    const { sut, loadUserByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(mockUserModel())
    const result = await sut.add(mockUserParams())
    expect(result.error).toEqual(new EmailInUseError())
  })
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()

    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockUserParams())
    expect(encryptSpy).toHaveBeenCalledWith(mockUserParams().password)
  })
  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = mockSut()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockUserParams())
    await expect(promise).rejects.toThrow()
  })
})
