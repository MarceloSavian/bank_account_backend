import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeGetAccountByUserID } from '@/main/factories/usecases/account/get-account-by-user-id/get-account-by-user-id'
import { GetAccountByUserIdController } from '@/presentation/controllers/account/get-account-by-user-id'
import { Controller } from '@/presentation/protocols'

export const makeGetAccountByUserIdController = (): Controller => {
  const getAccountByUserIdControllerController = new GetAccountByUserIdController(makeGetAccountByUserID())
  return makeLogControllerDecorator(getAccountByUserIdControllerController)
}
