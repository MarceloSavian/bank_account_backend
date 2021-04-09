import { mockAccountModel } from '@/domain/test/mock-account'
import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'
import { GetMovements } from '@/domain/usecases/movement/get-movements'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { mockGetAccountByUserId } from '@/presentation/test/mock-get-account-by-user-id'
import { mockGetMovements } from '@/presentation/test/mock-get-movements'
import MockDate from 'mockdate'
import { GetMovementController } from './get-movement-controller'

type SutTypes = {
  sut: GetMovementController
  getAccountByUserIdStub: GetAccountByUserId
  getMovementStub: GetMovements
}

const mockRequest = (): HttpRequest => ({
  userId: 'any_id'
})

const mockSut = (): SutTypes => {
  const getAccountByUserIdStub = mockGetAccountByUserId()
  const getMovementStub = mockGetMovements()
  const sut = new GetMovementController(getAccountByUserIdStub, getMovementStub)
  return {
    sut,
    getAccountByUserIdStub,
    getMovementStub
  }
}

describe('GetMovementController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
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
  test('Should call getMovementStub with correct values', async () => {
    const { sut, getMovementStub } = mockSut()

    const getSpy = jest.spyOn(getMovementStub, 'get')

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)
    expect(getSpy).toHaveBeenCalledWith(mockAccountModel().id)
  })
})
