
import MockDate from 'mockdate'
import { GetMovementsRepository } from '@/data/protocols/db/movement/get-movements-repository'
import { mockGetMovementsRepository } from '@/data/test/mock-movement'
import { mockMovementModel } from '@/domain/test/mock-movement'
import { DbGetMovements } from './get-movemens'

type SutTypes = {
  sut: DbGetMovements
  getMovementsRepositoryStub: GetMovementsRepository
}

const mockSut = (): SutTypes => {
  const getMovementsRepositoryStub = mockGetMovementsRepository()
  const sut = new DbGetMovements(getMovementsRepositoryStub)
  return {
    sut,
    getMovementsRepositoryStub
  }
}

describe('DbGetMovements', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should calls GetMovementsRepository', async () => {
    const { sut, getMovementsRepositoryStub } = mockSut()
    const getSpy = jest.spyOn(getMovementsRepositoryStub, 'getAll')
    await sut.get('any_id')
    expect(getSpy).toHaveBeenCalledWith('any_id', 20)
  })
  test('should returns movements on succes', async () => {
    const { sut } = mockSut()
    const account = await sut.get('any_id')
    expect(account).toEqual([mockMovementModel()])
  })
})
