import { DbGetMovements } from '@/data/usecases/movement/get-movements/get-movemens'
import { GetMovements } from '@/domain/usecases/movement/get-movements'
import { MovementMongoRepository } from '@/infra/db/mongodb/movement/movement-mongo-repository'

export const makeDbGetMovements = (): GetMovements => {
  const movementMongoRepository = new MovementMongoRepository()
  return new DbGetMovements(movementMongoRepository)
}
