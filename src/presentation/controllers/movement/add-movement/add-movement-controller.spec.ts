import { mockMovementParams } from '@/domain/test/mock-movement'
import { AddMovement } from '@/domain/usecases/movement/add-movement'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockAddMovement } from '@/presentation/test/mock-add-movement'
import { mockValidation } from '@/validation/test'
import { AddMovementController } from './add-movement-controller'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AddMovementController
  addMovementStub: AddMovement
  validationStub: Validation
}

const mockRequest = (): HttpRequest => ({
  body: {
    accountId: mockMovementParams().accountId,
    movementType: mockMovementParams().movementType,
    value: mockMovementParams().value
  }
})

const mockSut = (): SutTypes => {
  const addMovementStub = mockAddMovement()
  const validationStub = mockValidation()
  const sut = new AddMovementController(validationStub, addMovementStub)
  return {
    sut,
    addMovementStub,
    validationStub
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
})
