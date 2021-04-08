import { LoadUserByIdRepository } from '@/data/protocols/db/user/load-user-by-id-repository'
import { mockLoadUserByIdRepository } from '@/data/test'
import { DbLoadUserById } from './db-load-account-by-token'

type SutTypes = {
  sut: DbLoadUserById
  loadUserByIdRepositoryStub: LoadUserByIdRepository
}

const mockSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepository()
  return {
    sut: new DbLoadUserById(loadUserByIdRepositoryStub),
    loadUserByIdRepositoryStub
  }
}

describe('DbLoadUserByIdt UseCase', () => {
  test('Should call LoadUserByIdRepository with correct values', async () => {
    const { sut, loadUserByIdRepositoryStub } = mockSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.loadById('any_token')
    expect(loadByIdSpy).toHaveBeenLastCalledWith('any_token')
  })
  test('Should return null if LoadUserByIdtRepository returns null', async () => {
    const { sut, loadUserByIdRepositoryStub } = mockSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const accounnt = await sut.loadById('any_token')
    expect(accounnt).toBeNull()
  })
  test('Should throws if LoadUserByIdtRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = mockSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadById('any_token')
    await expect(promise).rejects.toThrow()
  })
})
