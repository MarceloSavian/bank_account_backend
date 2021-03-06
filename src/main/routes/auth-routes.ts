import { makeSignUpController } from '@/main/factories/controllers/auth/signup/signup-controller-factory'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/controllers/auth/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
