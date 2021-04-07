import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

type SutTypes = {
  sut: AccountMongoRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new AccountMongoRepository()
  }
}

describe('AccountMongoRepository', () => {
  let accountCollection: Collection
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  beforeAll(async () => {
    await mongoHelper.connect(String(process.env.MONGO_URL))
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('Should add an account on database', async () => {
    const { sut } = mockSut()
    await sut.add('any_id', 0)
    const account = await accountCollection.findOne({ userId: 'any_id' })
    expect(account).toBeTruthy()
    expect(account?._id).toBeTruthy()
    expect(account?.balance).toBe(0)
    expect(account?.createdAt).toEqual(new Date())
    expect(account?.updatedAt).toEqual(new Date())
  })
})
