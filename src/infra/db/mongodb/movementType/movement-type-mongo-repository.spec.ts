import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { mongoHelper } from '../helpers/mongo-helper'
import { MovementTypeMongoRepository } from './movement-type-mongo-repository'

type SutTypes = {
  sut: MovementTypeMongoRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new MovementTypeMongoRepository()
  }
}

describe('MovementTypeMongoRepository', () => {
  let movementTypeCollection: Collection
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
    movementTypeCollection = await mongoHelper.getCollection('movementTypes')
    await movementTypeCollection.deleteMany({})
  })
  describe('getById()', () => {
    test('Should return an movementType', async () => {
      const { sut } = mockSut()
      const result = await movementTypeCollection.insertOne({
        name: 'any_name',
        type: 'in'
      })
      const id = mongoHelper.map(result.ops[0]).id
      const movementType = await sut.getById(id)
      expect(movementType).toBeTruthy()
      expect(movementType?.id).toBeTruthy()
      expect(movementType?.name).toBe('any_name')
      expect(movementType?.type).toEqual('in')
    })
  })
})
