import { mockMovementParams } from '@/domain/test/mock-movement'
import { AddMovement } from '@/domain/usecases/movement/add-movement'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockAddMovement } from '@/presentation/test/mock-add-movement'
import { mockValidation } from '@/validation/test'
import { AddMovementController } from './add-movement-controller'

type SutTypes = {
  sut: AddMovementController
  addMovementStub: AddMovement
  validationStub: Validation
}

const mockRequest = (): HttpRequest => ({
  body: {
    accountId: mockMovementParams().accountId,
    password: mockMovementParams().movementType,
    passwordConfirmation: mockMovementParams().value
  }
})

const mockSut = (): SutTypes => {
  const addMovementStub = mockAddMovement()
  const validationStub = mockValidation()
  const sut = new AddMovementController(validationStub)
  return {
    sut,
    addMovementStub,
    validationStub
  }
}

describe('AddMovementController', () => {
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
})
