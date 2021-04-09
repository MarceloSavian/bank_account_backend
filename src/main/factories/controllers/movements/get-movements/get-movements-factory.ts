import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeGetAccountByUserID } from '@/main/factories/usecases/account/get-account-by-user-id/get-account-by-user-id'
import { makeDbGetMovements } from '@/main/factories/usecases/movement/get-movement/get-movement-factory'
import { GetMovementController } from '@/presentation/controllers/movement/get-movement/get-movement-controller'
import { Controller } from '@/presentation/protocols'

export const makeGetMovementController = (): Controller => {
  const getMovementController = new GetMovementController(
    makeGetAccountByUserID(),
    makeDbGetMovements()
  )
  return makeLogControllerDecorator(getMovementController)
}
