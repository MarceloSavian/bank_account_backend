import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { UserModel } from '@/domain/models/user'
import { AddUserParams } from '@/domain/usecases/user/add-user'
import { mongoHelper } from '../helpers/mongo-helper'

export class UserMongoRepository implements AddUserRepository {
  async add (userData: AddUserParams): Promise<UserModel> {
    const userCollection = await mongoHelper.getCollection('users')
    const result = await userCollection.insertOne(userData)

    return mongoHelper.map(result.ops[0])
  }
}
