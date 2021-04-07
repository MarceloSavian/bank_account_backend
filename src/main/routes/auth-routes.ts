import { makeSignUpController } from '@/presentation/factories/controllers/auth/signup/signup-controller-factory'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
