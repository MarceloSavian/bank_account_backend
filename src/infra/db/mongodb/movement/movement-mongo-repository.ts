import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { GetMovementsRepository } from '@/data/protocols/db/movement/get-movements-repository'
import { MovementModel } from '@/domain/models/movement'
import { MovementParams } from '@/domain/usecases/movement/add-movement'
import { mongoHelper } from '../helpers/mongo-helper'
import { QueryBuilder } from '../helpers/query-builder'

export class MovementMongoRepository implements AddMovementRepository, GetMovementsRepository {
  async add (movementData: MovementParams): Promise<void> {
    const collection = await mongoHelper.getCollection('movements')
    await collection.insertOne(movementData)
  }

  async getAll (limit: number): Promise<MovementModel[] | null> {
    const collection = await mongoHelper.getCollection('movements')
    const query = new QueryBuilder()
      .sort({ date: -1 })
      .limit(limit)
      .project({
        _id: {
          $toString: '$_id'
        },
        movementType: {
          $toObjectId: '$movementType'
        },
        value: 1,
        date: 1
      })
      .lookup({
        from: 'movementTypes',
        localField: 'movementType',
        foreignField: '_id',
        as: 'movementType'
      })
      .unwind({ path: '$movementType' })
    const result = await collection.aggregate(query.build()).toArray()
    return mongoHelper.mapCollection(result)
  }
}
