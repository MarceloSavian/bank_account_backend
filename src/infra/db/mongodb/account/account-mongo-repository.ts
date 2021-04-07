import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { GetAccountRepository } from '@/data/protocols/db/account/get-account-repository'
import { AccountModel } from '@/domain/models/account'
import { ObjectId } from 'bson'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, GetAccountRepository {
  async add (userId: string, balance: number): Promise<void> {
    const accountCollection = await mongoHelper.getCollection('accounts')

    const createdAt = new Date()
    const updatedAt = new Date()

    await accountCollection.insertOne({ userId, balance, createdAt, updatedAt })
  }

  async getById (id: string): Promise<AccountModel | null> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ _id: new ObjectId(id) })
    return account && mongoHelper.map(account)
  }
}
