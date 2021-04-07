import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddMovementController } from '../factories/controllers/movements/add-movements/add-movement-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/movement', auth, adaptRoute(makeAddMovementController()))
}
