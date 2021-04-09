import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeGetAccountByUserIdController } from '../factories/controllers/account/get-account-by-user-id/get-account-by-user-id-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/account', auth, adaptRoute(makeGetAccountByUserIdController()))
}
