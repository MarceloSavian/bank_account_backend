import { Collection } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import { UserMongoRepository } from './user-mongo-repository'
import { mockUserModel, mockUserParams } from '@/domain/test/mock-user'

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
  describe('loadByEmail()', () => {
    test('Should return an user on loadByEmail Success', async () => {
      const { sut } = mockSut()
      await userCollection.insertOne(mockUserModel())
      const user = await sut.loadByEmail(mockUserModel().email)
      expect(user).toBeTruthy()
      expect(user?.id).toBeTruthy()
      expect(user?.name).toBe(mockUserModel().name)
      expect(user?.email).toBe(mockUserModel().email)
      expect(user?.password).toBe(mockUserModel().password)
      expect(user?.roles).toEqual(mockUserModel().roles)
    })
    test('Should return null if loadByEmail fails', async () => {
      const { sut } = mockSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })
  describe('loadById()', () => {
    test('Should return an user on loadById Success', async () => {
      const { sut } = mockSut()
      const result = await userCollection.insertOne(mockUserModel())
      const id = mongoHelper.map(result.ops[0]).id
      const user = await sut.loadById(id)
      expect(user).toBeTruthy()
      expect(user?.id).toBeTruthy()
      expect(user?.name).toBe(mockUserModel().name)
      expect(user?.email).toBe(mockUserModel().email)
      expect(user?.password).toBe(mockUserModel().password)
      expect(user?.roles).toEqual(mockUserModel().roles)
    })
  })
})
