import { DbAddMovement } from './db-add-movement'
import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { mockAddMovementRepository } from '@/data/test/mock-movement'
import { mockMovementParams } from '@/domain/test/mock-movement'
import MockDate from 'mockdate'
import { GetAccountRepository } from '@/data/protocols/db/account/get-account-repository'
import { mockGetAccountRepository } from '@/data/test/mock-db-account'
import { mockGetMovementTypeRepository } from '@/data/test/mock-movement-type'
import { GetMovementTypeRepository } from '@/data/protocols/db/movementType/GetMovementTypeRepository'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: DbAddMovement
  addMovementRepositoryStub: AddMovementRepository
  getAccountRepositoryStub: GetAccountRepository
  getMovementTypeRepositoryStub: GetMovementTypeRepository
}

const mockSut = (): SutTypes => {
  const addMovementRepositoryStub = mockAddMovementRepository()
  const getAccountRepositoryStub = mockGetAccountRepository()
  const getMovementTypeRepositoryStub = mockGetMovementTypeRepository()
  return {
    sut: new DbAddMovement(addMovementRepositoryStub, getAccountRepositoryStub, getMovementTypeRepositoryStub),
    addMovementRepositoryStub,
    getAccountRepositoryStub,
    getMovementTypeRepositoryStub
  }
}

describe('DbAddMovement', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call GetMovementTypesRepository with correct values', async () => {
    const { sut, getMovementTypeRepositoryStub } = mockSut()
    const getSpy = jest.spyOn(getMovementTypeRepositoryStub, 'getById')
    await sut.add(mockMovementParams())
    expect(getSpy).toHaveBeenCalledWith(mockMovementParams().movementType)
  })
  test('Should throws if GetMovementTypesRepository throws', async () => {
    const { sut, getMovementTypeRepositoryStub } = mockSut()
    jest.spyOn(getMovementTypeRepositoryStub, 'getById').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockMovementParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should returns error if GetMovementTypesRepository returns null', async () => {
    const { sut, getMovementTypeRepositoryStub } = mockSut()
    jest.spyOn(getMovementTypeRepositoryStub, 'getById').mockResolvedValueOnce(null)
    const result = await sut.add(mockMovementParams())
    expect(result).toEqual(new InvalidParamError('movementType'))
  })
  test('Should call GetAccountRepository with correct values', async () => {
    const { sut, getAccountRepositoryStub } = mockSut()
    const getSpy = jest.spyOn(getAccountRepositoryStub, 'getById')
    await sut.add(mockMovementParams())
    expect(getSpy).toHaveBeenCalledWith(mockMovementParams().accountId)
  })
  test('Should returns error if GetAccountRepository returns null', async () => {
    const { sut, getAccountRepositoryStub } = mockSut()
    jest.spyOn(getAccountRepositoryStub, 'getById').mockResolvedValueOnce(null)
    const result = await sut.add(mockMovementParams())
    expect(result).toEqual(new InvalidParamError('accountId'))
  })
  test('Should throws if GetAccountRepository throws', async () => {
    const { sut, getAccountRepositoryStub } = mockSut()
    jest.spyOn(getAccountRepositoryStub, 'getById').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockMovementParams())
    await expect(promise).rejects.toThrow()
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
