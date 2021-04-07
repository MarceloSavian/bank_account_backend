import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user/load-user-by-email-repository'
import { UserModel } from '@/domain/models/user'
import { AddUserParams } from '@/domain/usecases/user/add-user'
import { mongoHelper } from '../helpers/mongo-helper'

export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository {
  async add (userData: AddUserParams): Promise<UserModel> {
    const userCollection = await mongoHelper.getCollection('users')
    const result = await userCollection.insertOne(userData)

    return mongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<UserModel | null> {
    const userCollection = await mongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user && mongoHelper.map(user)
  }
}
