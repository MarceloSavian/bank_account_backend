import { GetAccountByUserIdRepository } from '@/data/protocols/db/account/get-account-by-user-id-repository'
import { mockGetAccountByUserIdRepository } from '@/data/test/mock-db-account'
import { mockAccountModel } from '@/domain/test/mock-account'
import { DbGetAccountByUserId } from './db-get-account-by-user-id'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbGetAccountByUserId
  getAccountByUserIdRepositoryStub: GetAccountByUserIdRepository
}

const mockSut = (): SutTypes => {
  const getAccountByUserIdRepositoryStub = mockGetAccountByUserIdRepository()
  const sut = new DbGetAccountByUserId(getAccountByUserIdRepositoryStub)
  return {
    sut,
    getAccountByUserIdRepositoryStub
  }
}

describe('DbGetAccountByUserId', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should calls GetAccountByUserIdRepository with correct values', async () => {
    const { sut, getAccountByUserIdRepositoryStub } = mockSut()
    const getSpy = jest.spyOn(getAccountByUserIdRepositoryStub, 'getByUserId')
    await sut.get('any_id')
    expect(getSpy).toHaveBeenCalledWith('any_id')
  })
  test('should returns an account on succes', async () => {
    const { sut } = mockSut()
    const account = await sut.get('any_id')
    expect(account).toEqual(mockAccountModel())
  })
})
