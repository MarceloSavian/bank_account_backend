import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import { mockUserModel } from '@/domain/test'
import { AccessDeniedError } from '../errors/access-denied-error'
import { HttpRequest } from '../protocols'
import { LoadSessionByToken } from '@/domain/usecases/session/load-session-by-token'
import { LoadUserById } from '@/domain/usecases/user/load-user-by-id'
import { mockLoadSessionByToken } from '../test/mock-load-session-by-token'
import { mockLoadUserById } from '../test/mock-load-user-by-id'
import { mockSessionModel } from '@/domain/test/mock-session'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AuthMiddleware
  loadSessionByTokenStub: LoadSessionByToken
  loadUserById: LoadUserById
}

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const mockSut = (role?: string): SutTypes => {
  const loadSessionByTokenStub = mockLoadSessionByToken()
  const loadUserById = mockLoadUserById()
  return {
    sut: new AuthMiddleware(loadSessionByTokenStub, loadUserById, role),
    loadSessionByTokenStub,
    loadUserById
  }
}

describe('Auth Middleware', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should call LoadSessionByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadSessionByTokenStub } = mockSut(role)
    const loadSpy = jest.spyOn(loadSessionByTokenStub, 'load')
    await sut.handle(mockRequest())

    expect(loadSpy).toHaveBeenCalledWith(mockRequest().headers['x-access-token'])
  })
  test('Should call LoadUserById with correct id', async () => {
    const role = 'any_role'
    const { sut, loadUserById } = mockSut(role)
    const loadSpy = jest.spyOn(loadUserById, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockUserModel().id)
  })
  test('Should return 403 LoadSessionByToken returns null', async () => {
    const { sut, loadSessionByTokenStub } = mockSut()
    jest.spyOn(loadSessionByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should return 403 LoadUserById returns null', async () => {
    const { sut, loadUserById } = mockSut()
    jest.spyOn(loadUserById, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should return 403 LoadUserById returns an user without the role', async () => {
    const role = 'any_role'
    const { sut, loadUserById } = mockSut(role)
    jest.spyOn(loadUserById, 'loadById').mockResolvedValueOnce({ ...mockUserModel(), roles: ['any_other_role'] })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should return 403 if ExpireAt is lower', async () => {
    const { sut, loadSessionByTokenStub } = mockSut()
    jest.spyOn(loadSessionByTokenStub, 'load').mockResolvedValueOnce({
      ...mockSessionModel(),
      expireAt: new Date(new Date().setMilliseconds(-1000))
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should return 200 LoadUserById returns an user', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ userId: mockUserModel().id }))
  })
  test('Should return 500 LoadSessionByToken throws', async () => {
    const { sut, loadSessionByTokenStub } = mockSut()
    jest.spyOn(loadSessionByTokenStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
