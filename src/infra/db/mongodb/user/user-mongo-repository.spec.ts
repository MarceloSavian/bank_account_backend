import { Collection } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import { UserMongoRepository } from './user-mongo-repository'
import { mockUserParams } from '@/domain/test/mock-user'

type SutTypes = {
  sut: UserMongoRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new UserMongoRepository()
  }
}

describe('User Mongo Repository', () => {
  let userCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(String(process.env.MONGO_URL))
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  beforeEach(async () => {
    userCollection = await mongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })
  describe('add()', () => {
    test('Should return an user on success', async () => {
      const { sut } = mockSut()
      const user = await sut.add(mockUserParams())
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(mockUserParams().name)
      expect(user.email).toBe(mockUserParams().email)
      expect(user.password).toBe(mockUserParams().password)
      expect(user.roles).toEqual(mockUserParams().roles)
    })
  })
})
