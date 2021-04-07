import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddMovement } from '@/main/factories/usecases/movement/add-movement/add-movement-factory'
import { AddMovementController } from '@/presentation/controllers/movement/add-movement/add-movement-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddMovementValidation } from './add-movement-validation-factory'

export const makeAddMovementController = (): Controller => {
  const addMovementController = new AddMovementController(makeAddMovementValidation(), makeDbAddMovement())
  return makeLogControllerDecorator(addMovementController)
}
