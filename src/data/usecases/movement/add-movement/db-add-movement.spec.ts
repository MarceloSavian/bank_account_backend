import { DbAddMovement } from './db-add-movement'
import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { mockAddMovementRepository } from '@/data/test/mock-movement'
import { mockMovementParams } from '@/domain/test/mock-movement'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddMovement
  addMovementRepositoryStub: AddMovementRepository
}

const mockSut = (): SutTypes => {
  const addMovementRepositoryStub = mockAddMovementRepository()
  return {
    sut: new DbAddMovement(addMovementRepositoryStub),
    addMovementRepositoryStub
  }
}

describe('DbAddMovement', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddMovementsRepository with correct values', async () => {
    const { sut, addMovementRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addMovementRepositoryStub, 'add')
    await sut.add(mockMovementParams())
    expect(addSpy).toHaveBeenCalledWith(mockMovementParams())
  })
  test('Should throws if AddMovementsRepository throws', async () => {
    const { sut, addMovementRepositoryStub } = mockSut()
    jest.spyOn(addMovementRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockMovementParams())
    await expect(promise).rejects.toThrow()
  })
})
