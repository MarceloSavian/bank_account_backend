import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SignUpController } from '@/presentation/controllers/auth/signup/signup-controller'
import { makeDbAddUser } from '@/main/factories/usecases/user/add-user/add-user-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/user/authentication/db-authentication-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddUser(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
