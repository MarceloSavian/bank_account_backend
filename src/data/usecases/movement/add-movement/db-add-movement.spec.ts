import { DbAddMovement } from './db-add-movement'
import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { mockAddMovementRepository } from '@/data/test/mock-movement'
import { mockMovementParams } from '@/domain/test/mock-movement'
import MockDate from 'mockdate'
import { GetAccountRepository } from '@/data/protocols/db/account/get-account-repository'
import { mockGetAccountRepository, mockUpdateAccountRepository } from '@/data/test/mock-db-account'
import { mockGetMovementTypeRepository } from '@/data/test/mock-movement-type'
import { GetMovementTypeRepository } from '@/data/protocols/db/movementType/GetMovementTypeRepository'
import { InvalidParamError } from '@/presentation/errors'
import { mockMovementTypeOut } from '@/domain/test/mock-movement-type'
import { UpdateAccountRepository } from '@/data/protocols/db/account/update-account-repository'
import { mockAccountModel } from '@/domain/test/mock-account'

type SutTypes = {
  sut: DbAddMovement
  addMovementRepositoryStub: AddMovementRepository
  getAccountRepositoryStub: GetAccountRepository
  getMovementTypeRepositoryStub: GetMovementTypeRepository
  updateAccountRepositoryStub: UpdateAccountRepository
}

const mockSut = (): SutTypes => {
  const addMovementRepositoryStub = mockAddMovementRepository()
  const getAccountRepositoryStub = mockGetAccountRepository()
  const getMovementTypeRepositoryStub = mockGetMovementTypeRepository()
  const updateAccountRepositoryStub = mockUpdateAccountRepository()
  return {
    sut: new DbAddMovement(
      addMovementRepositoryStub,
      getAccountRepositoryStub,
      getMovementTypeRepositoryStub,
      updateAccountRepositoryStub
    ),
    addMovementRepositoryStub,
    getAccountRepositoryStub,
    getMovementTypeRepositoryStub,
    updateAccountRepositoryStub
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
  test('Should returns error if Movement value is lower than balance', async () => {
    const { sut, getMovementTypeRepositoryStub } = mockSut()
    jest.spyOn(getMovementTypeRepositoryStub, 'getById').mockResolvedValueOnce(mockMovementTypeOut())
    const result = await sut.add(mockMovementParams())
    expect(result).toEqual(new InvalidParamError('value'))
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
  test('Should call UpdateAccountRepository with correct values', async () => {
    const { sut, updateAccountRepositoryStub } = mockSut()
    const updateSpy = jest.spyOn(updateAccountRepositoryStub, 'update')
    await sut.add(mockMovementParams())
    expect(updateSpy).toHaveBeenCalledWith(
      mockMovementParams().accountId,
      mockAccountModel().balance + mockMovementParams().value
    )
  })
  test('Should throws if UpdateAccountRepository throws', async () => {
    const { sut, updateAccountRepositoryStub } = mockSut()
    jest.spyOn(updateAccountRepositoryStub, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockMovementParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should lower balance value if movementType is out', async () => {
    const { sut, updateAccountRepositoryStub, getMovementTypeRepositoryStub, getAccountRepositoryStub } = mockSut()
    jest.spyOn(getMovementTypeRepositoryStub, 'getById').mockResolvedValueOnce(mockMovementTypeOut())
    jest.spyOn(getAccountRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockAccountModel(),
      balance: 30
    })
    const updateSpy = jest.spyOn(updateAccountRepositoryStub, 'update')
    await sut.add(mockMovementParams())
    expect(updateSpy).toHaveBeenCalledWith(
      mockMovementParams().accountId,
      30 - mockMovementParams().value
    )
  })
})
