import { Collection } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import { SessionMongoRepository } from './session-mongo-repository'
import MockDate from 'mockdate'

type SutTypes = {
  sut: SessionMongoRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new SessionMongoRepository()
  }
}

describe('SessionMongoRepository', () => {
  let sessionCollection: Collection
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
    sessionCollection = await mongoHelper.getCollection('sessions')
    await sessionCollection.deleteMany({})
  })
  describe('add()', () => {
    test('Should add an session', async () => {
      const { sut } = mockSut()
      await sut.add('any_token', new Date(), 'any_id')
      const session = await sessionCollection.findOne({ token: 'any_token' })
      expect(session).toBeTruthy()
      expect(session?._id).toBeTruthy()
      expect(session?.token).toBe('any_token')
      expect(session?.expireAt).toEqual(new Date())
      expect(session?.user_id).toBe('any_id')
    })
  })
})
