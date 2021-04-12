import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mongoHelper } from '../helpers/mongo-helper'
import { mockMovementParamsRepo } from '@/domain/test/mock-movement'
import { MovementMongoRepository } from './movement-mongo-repository'
import { mockMovementTypeIn } from '@/domain/test/mock-movement-type'
import { mockAccountModel } from '@/domain/test/mock-account'

type SutTypes = {
  sut: MovementMongoRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new MovementMongoRepository()
  }
}

describe('MovementMongoRepository', () => {
  let movementCollection: Collection
  let movementTypesCollection: Collection
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
    movementCollection = await mongoHelper.getCollection('movements')
    await movementCollection.deleteMany({})
    movementTypesCollection = await mongoHelper.getCollection('movementTypes')
    await movementTypesCollection.deleteMany({})
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('add()', () => {
    test('Should add an movement on database', async () => {
      const { sut } = mockSut()
      await sut.add(mockMovementParamsRepo())
      const movement = await movementCollection.findOne({})
      expect(movement).toBeTruthy()
      expect(movement?._id).toBeTruthy()
      expect(movement?.value).toBe(mockMovementParamsRepo().value)
      expect(movement?.accountId).toEqual(mockMovementParamsRepo().accountId)
      expect(movement?.balance).toEqual(mockMovementParamsRepo().balance)
      expect(movement?.date).toEqual(mockMovementParamsRepo().date)
      expect(movement?.movementType).toEqual(mockMovementParamsRepo().movementType)
    })
  })
  describe('getAll()', () => {
    test('Should get an movement on database', async () => {
      const { sut } = mockSut()
      const result = await accountCollection.insertOne({
        balance: mockAccountModel().balance,
        createdAt: mockAccountModel().createdAt,
        updatedAt: mockAccountModel().updatedAt,
        userId: mockAccountModel().userId
      })
      const acountid = mongoHelper.map(result.ops[0]).id
      const resultType = await movementTypesCollection.insertOne({
        name: mockMovementTypeIn().name,
        type: mockMovementTypeIn().type
      })
      const id = mongoHelper.map(resultType.ops[0]).id
      await movementCollection.insertMany([{
        accountId: acountid,
        movementType: String(id),
        value: 20,
        date: new Date(),
        balance: 20
      }])
      const movements = await sut.getAll(acountid, 20)
      expect(movements?.[0]).toBeTruthy()
      expect(movements?.[0]?.id).toBeTruthy()
      expect(movements?.[0]?.value).toBe(20)
      expect(movements?.[0]?.date).toEqual(new Date())
      expect(movements?.[0]?.balance).toBe(20)
      expect(movements?.[0]?.movementType).toBeTruthy()
      expect(movements?.[0]?.movementType.id).toBeTruthy()
      expect(movements?.[0]?.movementType.type).toBe(mockMovementTypeIn().type)
      expect(movements?.[0]?.movementType.name).toBe(mockMovementTypeIn().name)
    })
  })
})
