import { SignUpController } from './signup-controller'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockUserParams } from '@/domain/test'
import { AddUser } from '@/domain/usecases/user/add-user'
import { mockAddUser } from '@/presentation/test/mock-add-user'
import { mockValidation } from '@/presentation/test/mock-validation'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors'

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
}

const mockSut = (): SutTypes => {
  const addUserStub = mockAddUser()
  const validationStub = mockValidation()
  const sut = new SignUpController(addUserStub, validationStub)
  return {
    sut,
    addUserStub,
    validationStub
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
})
