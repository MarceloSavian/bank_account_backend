import { DbAddMovement } from '@/data/usecases/movement/add-movement/db-add-movement'
import { AddMovement } from '@/domain/usecases/movement/add-movement'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { MovementMongoRepository } from '@/infra/db/mongodb/movement/movement-mongo-repository'
import { MovementTypeMongoRepository } from '@/infra/db/mongodb/movementType/movement-type-mongo-repository'

export const makeDbAddMovement = (): AddMovement => {
  const movementMongoRepository = new MovementMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  const movementTypeMongoRepository = new MovementTypeMongoRepository()
  return new DbAddMovement(movementMongoRepository, accountMongoRepository, movementTypeMongoRepository, accountMongoRepository)
}
