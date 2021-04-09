import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeGetMovementTypesController } from '../factories/controllers/movement-types/get-movement-types-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/movementTypes', auth, adaptRoute(makeGetMovementTypesController()))
}
