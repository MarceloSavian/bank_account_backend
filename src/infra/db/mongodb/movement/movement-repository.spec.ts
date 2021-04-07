import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mongoHelper } from '../helpers/mongo-helper'
import { mockMovementParams } from '@/domain/test/mock-movement'
import { MovementMongoRepository } from './movement-mongo-repository'

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
})
