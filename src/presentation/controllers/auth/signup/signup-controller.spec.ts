import { SignUpController } from './signup-controller'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockUserModel, mockUserParams } from '@/domain/test'
import { AddUser } from '@/domain/usecases/user/add-user'
import { mockAddUser } from '@/presentation/test/mock-add-user'
import { mockValidation } from '@/presentation/test/mock-validation'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors'
import { mockAuthentication } from '@/presentation/test/mock-authentication'
import { Authentication } from '@/domain/usecases/user/authentication'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { mockAddAccount } from '@/presentation/test/mock-add-account'

const mockRequest = (): HttpRequest => ({
  body: {
    name: mockUserParams().name,
    email: mockUserParams().email,
    password: mockUserParams().password,
    passwordConfirmation: mockUserParams().password,
    roles: mockUserParams().roles
  }
})

type SutTypes = {
  sut: SignUpController
  addUserStub: AddUser
  validationStub: Validation
  authenticationStub: Authentication
  addAccountStub: AddAccount
}

const mockSut = (): SutTypes => {
  const addUserStub = mockAddUser()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(addUserStub, validationStub, authenticationStub, addAccountStub)
  return {
    sut,
    addUserStub,
    validationStub,
    authenticationStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = mockSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = mockSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = mockSut()

    const addSpy = jest.spyOn(addUserStub, 'add')

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(mockUserParams())
  })
  test('Should return 500 if AddUser throws', async () => {
    const { sut, addUserStub } = mockSut()

    jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => { throw new Error() })

    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })
  test('Should return 403 if AddUser returns an error', async () => {
    const { sut, addUserStub } = mockSut()
    jest.spyOn(addUserStub, 'add').mockResolvedValueOnce({ error: new Error() })
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new Error()))
  })
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = mockSut()

    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(mockRequest())

    expect(authSpy).toHaveBeenCalledWith({
      email: mockRequest().body.email,
      password: mockRequest().body.password
    })
  })
  test('Should return 500 if Authentication Throws', async () => {
    const { sut, authenticationStub } = mockSut()

    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(serverError(new Error()))
  })
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = mockSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(mockRequest())

    expect(addSpy).toHaveBeenCalledWith(mockUserModel().id)
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = mockSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ token: 'any_token', user: mockUserModel() }))
  })
})
