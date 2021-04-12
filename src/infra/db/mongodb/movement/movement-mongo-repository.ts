import { AddMovementRepository } from '@/data/protocols/db/movement/add-movement-repository'
import { GetMovementsRepository } from '@/data/protocols/db/movement/get-movements-repository'
import { MovementModel } from '@/domain/models/movement'
import { MovementParams } from '@/domain/usecases/movement/add-movement'
import { ObjectId } from 'bson'
import { mongoHelper } from '../helpers/mongo-helper'
import { QueryBuilder } from '../helpers/query-builder'

export class MovementMongoRepository implements AddMovementRepository, GetMovementsRepository {
  async add (movementData: MovementParams): Promise<void> {
    const collection = await mongoHelper.getCollection('movements')
    await collection.insertOne(movementData)
  }

  async getAll (accountId: string, limit: number): Promise<MovementModel[] | null> {
    const collection = await mongoHelper.getCollection('movements')
    const query = new QueryBuilder()
      .match({ accountId: new ObjectId(accountId) })
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
      .project({
        _id: {
          $toString: '$_id'
        },
        movementType: {
          id: {
            $toString: '$movementType._id'
          },
          name: '$movementType.name',
          type: '$movementType.type'
        },
        value: 1,
        date: 1
      })
    const result = await collection.aggregate(query.build()).toArray()
    return mongoHelper.mapCollection(result)
  }
}
