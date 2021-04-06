import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { mockLoadUserByEmailRepository } from '@/data/test/mock-db-user'
import { mockAuthenticationParams } from '@/domain/test'
import { DbAuthentication } from './db-authentication'

  type SutTypes = {
    sut: DbAuthentication
    loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  }

const mockSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = mockSut()
    const loadSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockAuthenticationParams())
    expect(loadSpy).toBeCalledWith(mockAuthenticationParams().email)
  })
})
