import { GetMovementTypesRepository } from '@/data/protocols/db/movementType/get-movement-types-repository'
import { mockGetMovementTypesRepository } from '@/data/test/mock-movement-type'
import { mockMovementTypeIn, mockMovementTypeOut } from '@/domain/test/mock-movement-type'
import { DbGetMovementTypes } from './db-get-movement-types'

type SutTypes = {
  sut: DbGetMovementTypes
  getMovementTypesRepositoryStub: GetMovementTypesRepository
}

const mockSut = (): SutTypes => {
  const getMovementTypesRepositoryStub = mockGetMovementTypesRepository()
  const sut = new DbGetMovementTypes(getMovementTypesRepositoryStub)
  return {
    sut,
    getMovementTypesRepositoryStub
  }
}

describe('DbGetMovementTypes', () => {
  test('should calls GetMovementTypesRepository with correct values', async () => {
    const { sut, getMovementTypesRepositoryStub } = mockSut()
    const getSpy = jest.spyOn(getMovementTypesRepositoryStub, 'getAll')
    await sut.get()
    expect(getSpy).toHaveBeenCalled()
  })
  test('should returns an array on success', async () => {
    const { sut } = mockSut()
    const account = await sut.get()
    expect(account).toEqual([mockMovementTypeIn(), mockMovementTypeIn(), mockMovementTypeOut()])
  })
})
