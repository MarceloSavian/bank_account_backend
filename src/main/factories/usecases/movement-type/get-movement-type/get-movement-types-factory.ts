import { DbGetMovementTypes } from '@/data/usecases/movementTypes/get-movement-types/db-get-movement-types'
import { MovementTypeMongoRepository } from '@/infra/db/mongodb/movementType/movement-type-mongo-repository'

export const makeGetMovementTypes = (): DbGetMovementTypes => {
  const movementTypeMongoRepository = new MovementTypeMongoRepository()
  return new DbGetMovementTypes(movementTypeMongoRepository)
}
