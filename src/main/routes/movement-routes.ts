import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddMovementController } from '../factories/controllers/movements/add-movements/add-movement-factory'
import { makeGetMovementController } from '../factories/controllers/movements/get-movements/get-movements-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/movements', auth, adaptRoute(makeAddMovementController()))
  router.get('/movements', auth, adaptRoute(makeGetMovementController()))
}
