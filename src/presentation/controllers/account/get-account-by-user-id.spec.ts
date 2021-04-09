import { GetAccountByUserId } from '@/domain/usecases/account/get-account-by-user-id'
import { InvalidParamError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
import { mockGetAccountByUserId } from '@/presentation/test/mock-get-account-by-user-id'
import { GetAccountByUserIdController } from './get-account-by-user-id'
import MockDate from 'mockdate'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'

type SutTypes = {
  sut: GetAccountByUserIdController
  getAccountByUserIdStub: GetAccountByUserId
}

const mockRequest = (): HttpRequest => ({
  userId: 'any_id'
})

const mockSut = (): SutTypes => {
  const getAccountByUserIdStub = mockGetAccountByUserId()
  const sut = new GetAccountByUserIdController(getAccountByUserIdStub)
  return {
    sut,
    getAccountByUserIdStub
  }
}

describe('GetAccountByUserIdController', () => {
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
})
