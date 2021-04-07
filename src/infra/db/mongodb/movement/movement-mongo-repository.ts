import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { MovementParams } from '@/domain/usecases/movement/add-movement'
import { mongoHelper } from '../helpers/mongo-helper'

export class MovementMongoRepository implements AddMovementRepository {
  async add (movementData: MovementParams): Promise<void> {
    const collection = await mongoHelper.getCollection('movements')
    await collection.insertOne(movementData)
  }
}
