import { mockMovementParams } from '@/domain/test/mock-movement'
import { AddMovement } from '@/domain/usecases/movement/add-movement'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockAddMovement } from '@/presentation/test/mock-add-movement'
import { mockValidation } from '@/validation/test'
import { AddMovementController } from './add-movement-controller'
import MockDate from 'mockdate'
import { InvalidParamError } from '@/presentation/errors'
import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'
import { mockGetAccountByUserId } from '@/presentation/test/mock-get-account-by-user-id'

type SutTypes = {
  sut: AddMovementController
  addMovementStub: AddMovement
  validationStub: Validation
  getAccountByUserIdStub: GetAccountByUserId
}

const mockRequest = (): HttpRequest => ({
  body: {
    accountId: mockMovementParams().accountId,
    movementType: mockMovementParams().movementType,
    value: mockMovementParams().value
  },
  userId: 'any_id'
})

const mockSut = (): SutTypes => {
  const addMovementStub = mockAddMovement()
  const validationStub = mockValidation()
  const getAccountByUserIdStub = mockGetAccountByUserId()
  const sut = new AddMovementController(validationStub, addMovementStub, getAccountByUserIdStub)
  return {
    sut,
    addMovementStub,
    validationStub,
    getAccountByUserIdStub
  }
}

describe('AddMovementController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = mockSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should call GetAccountByUserIdStub with correct values', async () => {
    const { sut, getAccountByUserIdStub } = mockSut()

    const getSpy = jest.spyOn(getAccountByUserIdStub, 'get')

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)
    expect(getSpy).toHaveBeenCalledWith(mockRequest().userId)
  })
  test('Should returns 500 if GetAccountByUserIdStub throws', async () => {
    const { sut, getAccountByUserIdStub } = mockSut()
    jest.spyOn(getAccountByUserIdStub, 'get').mockRejectedValueOnce(new Error())
    const httpRequest = mockRequest()
    const res = await sut.handle(httpRequest)
    expect(res).toEqual(serverError(new Error()))
  })
  test('Should return 400 if GetAccountByUserIdStub returns null', async () => {
    const { sut, getAccountByUserIdStub } = mockSut()
    jest.spyOn(getAccountByUserIdStub, 'get').mockResolvedValueOnce(null)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })
  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = mockSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call AddMovement with correct values', async () => {
    const { sut, addMovementStub } = mockSut()

    const addSpy = jest.spyOn(addMovementStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      accountId: mockMovementParams().accountId,
      movementType: mockMovementParams().movementType,
      value: mockMovementParams().value,
      date: new Date()
    })
  })
  test('Should returns 400 if AddMovement returns an error', async () => {
    const { sut, addMovementStub } = mockSut()

    jest.spyOn(addMovementStub, 'add').mockResolvedValueOnce(new InvalidParamError('any'))
    const httpRequest = mockRequest()
    const res = await sut.handle(httpRequest)
    expect(res).toEqual(badRequest(new InvalidParamError('any')))
  })
  test('Should returns 500 if AddMovement throws', async () => {
    const { sut, addMovementStub } = mockSut()
    jest.spyOn(addMovementStub, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = mockRequest()
    const res = await sut.handle(httpRequest)
    expect(res).toEqual(serverError(new Error()))
  })
})
