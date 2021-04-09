import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mongoHelper } from '../helpers/mongo-helper'
import { mockMovementParams } from '@/domain/test/mock-movement'
import { MovementMongoRepository } from './movement-mongo-repository'
import { mockMovementTypeIn } from '@/domain/test/mock-movement-type'

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
  })
  describe('add()', () => {
    test('Should add an movement on database', async () => {
      const { sut } = mockSut()
      await sut.add(mockMovementParams())
      const movement = await movementCollection.findOne({})
      expect(movement).toBeTruthy()
      expect(movement?._id).toBeTruthy()
      expect(movement?.value).toBe(mockMovementParams().value)
      expect(movement?.accountId).toEqual(mockMovementParams().accountId)
      expect(movement?.date).toEqual(mockMovementParams().date)
      expect(movement?.movementType).toEqual(mockMovementParams().movementType)
    })
  })
  describe('getAll()', () => {
    test('Should get an movement on database', async () => {
      const { sut } = mockSut()
      const result = await movementTypesCollection.insertOne(mockMovementTypeIn())
      const id = mongoHelper.map(result.ops[0]).id
      await movementCollection.insertMany([{
        accountId: 'any_id',
        movementType: String(id),
        value: 20,
        date: new Date()
      }])
      const movements = await sut.getAll(20)
      console.log(movements)
      expect(movements?.[0]).toBeTruthy()
      expect(movements?.[0]?.id).toBeTruthy()
      expect(movements?.[0]?.value).toBe(20)
      expect(movements?.[0]?.date).toEqual(new Date())
    })
  })
})
