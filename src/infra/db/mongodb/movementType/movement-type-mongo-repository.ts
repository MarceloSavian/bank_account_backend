import { GetMovementTypeRepository } from '@/data/protocols/db/movementType/GetMovementTypeRepository'
import { MovementTypeModel } from '@/domain/models/movementType'
import { ObjectId } from 'bson'
import { mongoHelper } from '../helpers/mongo-helper'

export class MovementTypeMongoRepository implements GetMovementTypeRepository {
  async getById (id: string): Promise<MovementTypeModel | null> {
    const movementTypeCollection = await mongoHelper.getCollection('movementTypes')
    const movementType = await movementTypeCollection.findOne({ _id: new ObjectId(id) })
    return movementType && mongoHelper.map(movementType)
  }
}
