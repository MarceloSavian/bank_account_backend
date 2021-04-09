import { GetMovementTypeRepository } from '@/data/protocols/db/movementType/get-movement-type-repository'
import { GetMovementTypesRepository } from '@/data/protocols/db/movementType/get-movement-types-repository'
import { MovementTypeModel } from '@/domain/models/movementType'
import { ObjectId } from 'bson'
import { mongoHelper } from '../helpers/mongo-helper'

export class MovementTypeMongoRepository implements GetMovementTypeRepository, GetMovementTypesRepository {
  async getById (id: string): Promise<MovementTypeModel | null> {
    const movementTypeCollection = await mongoHelper.getCollection('movementTypes')
    const movementType = await movementTypeCollection.findOne({ _id: new ObjectId(id) })
    return movementType && mongoHelper.map(movementType)
  }

  async getAll (): Promise<MovementTypeModel[] | null> {
    const movementTypeCollection = await mongoHelper.getCollection('movementTypes')
    const movementTypes = await movementTypeCollection.find().toArray()
    return movementTypes && mongoHelper.mapCollection(movementTypes)
  }
}
