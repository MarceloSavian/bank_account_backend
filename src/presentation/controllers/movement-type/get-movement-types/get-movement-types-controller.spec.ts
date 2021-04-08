import { GetMovementTypes } from '@/domain/usecases/movementTypes/get-movement-types'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { mockGetMovementTypes } from '@/presentation/test/mock-get-movement-types'
import { GetMovementTypesController } from './get-movement-types-controller'

type SutTypes = {
  sut: GetMovementTypesController
  getMovementTypesStub: GetMovementTypes
}

const mockSut = (): SutTypes => {
  const getMovementTypesStub = mockGetMovementTypes()
  const sut = new GetMovementTypesController(getMovementTypesStub)
  return {
    sut,
    getMovementTypesStub
  }
}

describe('GetMovementTypesController', () => {
  test('Should call getMovementTypes', async () => {
    const { sut, getMovementTypesStub } = mockSut()
    const getSpy = jest.spyOn(getMovementTypesStub, 'get')
    await sut.handle()
    expect(getSpy).toHaveBeenCalled()
  })
  test('Should returns 500 if GetMovementTypes throws', async () => {
    const { sut, getMovementTypesStub } = mockSut()
    jest.spyOn(getMovementTypesStub, 'get').mockRejectedValueOnce(new Error())
    const res = await sut.handle()
    expect(res).toEqual(serverError(new Error()))
  })
})
