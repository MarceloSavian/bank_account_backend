import { Collection, ObjectId } from 'mongodb'
import MockDate from 'mockdate'
import { mongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
import { mockAccountModel } from '@/domain/test/mock-account'
import { mockUserModel } from '@/domain/test'

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
  let userCollection: Collection
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
    userCollection = await mongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })
  describe('add()', () => {
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
  describe('getById()', () => {
    test('Should returns an account ', async () => {
      const { sut } = mockSut()
      const result = await accountCollection.insertOne({
        balance: mockAccountModel().balance,
        createdAt: mockAccountModel().createdAt,
        updatedAt: mockAccountModel().updatedAt,
        userId: mockAccountModel().userId
      })
      const id = mongoHelper.map(result.ops[0]).id
      const account = await sut.getById(id)
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.balance).toBe(mockAccountModel().balance)
      expect(account?.createdAt).toEqual(mockAccountModel().createdAt)
      expect(account?.updatedAt).toEqual(mockAccountModel().updatedAt)
      expect(account?.userId).toEqual(mockAccountModel().userId)
    })
  })
  describe('getByUserId()', () => {
    test('Should returns an account ', async () => {
      const { sut } = mockSut()
      const result = await userCollection.insertOne(mockUserModel())
      const id = mongoHelper.map(result.ops[0]).id
      await accountCollection.insertOne({
        balance: mockAccountModel().balance,
        createdAt: mockAccountModel().createdAt,
        updatedAt: mockAccountModel().updatedAt,
        userId: id
      })
      const account = await sut.getByUserId(id)
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.balance).toBe(mockAccountModel().balance)
      expect(account?.createdAt).toEqual(mockAccountModel().createdAt)
      expect(account?.updatedAt).toEqual(mockAccountModel().updatedAt)
      expect(account?.userId).toEqual(id)
    })
  })
  describe('update()', () => {
    test('Should update an account ', async () => {
      const { sut } = mockSut()
      const result = await accountCollection.insertOne({
        balance: mockAccountModel().balance,
        createdAt: mockAccountModel().createdAt,
        updatedAt: mockAccountModel().updatedAt,
        userId: mockAccountModel().userId
      })
      const id = mongoHelper.map(result.ops[0]).id
      await sut.update(id, 30)
      const account = await accountCollection.findOne({ _id: new ObjectId(id) })
      expect(account).toBeTruthy()
      expect(account?._id).toBeTruthy()
      expect(account?.balance).toBe(30)
      expect(account?.createdAt).toEqual(mockAccountModel().createdAt)
      expect(account?.updatedAt).toEqual(mockAccountModel().updatedAt)
      expect(account?.userId).toEqual(mockAccountModel().userId)
    })
  })
})
