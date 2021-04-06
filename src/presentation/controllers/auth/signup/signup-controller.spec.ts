import { SignUpController } from './signup-controller'
import { HttpRequest } from '@/presentation/protocols'
import { mockUserParams } from '@/domain/test'
import { AddUser } from '@/domain/usecases/user/add-user'
import { mockAddUser } from '@/presentation/test/mock-add-user'

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
}

const mockSut = (): SutTypes => {
  const addUserStub = mockAddUser()
  const sut = new SignUpController(addUserStub)
  return {
    sut,
    addUserStub
  }
}

describe('SignUp Controller', () => {
  test('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = mockSut()

    const addSpy = jest.spyOn(addUserStub, 'add')

    const httpRequest = mockRequest()

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(mockUserParams())
  })
})
