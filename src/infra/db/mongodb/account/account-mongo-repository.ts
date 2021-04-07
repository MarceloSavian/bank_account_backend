import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (userId: string, balance: number): Promise<void> {
    const accountCollection = await mongoHelper.getCollection('accounts')

    const createdAt = new Date()
    const updatedAt = new Date()

    await accountCollection.insertOne({ userId, balance, createdAt, updatedAt })
  }
}
