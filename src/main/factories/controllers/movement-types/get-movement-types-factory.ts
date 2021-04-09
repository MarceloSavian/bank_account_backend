import { GetMovementTypesController } from '@/presentation/controllers/movement-type/get-movement-types/get-movement-types-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeGetMovementTypes } from '../../usecases/movement-type/get-movement-type/get-movement-types-factory'

export const makeGetMovementTypesController = (): Controller => {
  const getMovementTypesController = new GetMovementTypesController(makeGetMovementTypes())
  return makeLogControllerDecorator(getMovementTypesController)
}
