import { Collection } from 'mongodb'
import request from 'supertest'
import { mongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let userCollection: Collection
let movementCollection: Collection
let movementTypeCollection: Collection
let accountCollection: Collection

describe('Auth routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(String(process.env.MONGO_URL))
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  beforeEach(async () => {
    userCollection = await mongoHelper.getCollection('users')
    await userCollection.deleteMany({})
    movementCollection = await mongoHelper.getCollection('movements')
    await movementCollection.deleteMany({})
    movementTypeCollection = await mongoHelper.getCollection('movementTypes')
    await movementTypeCollection.deleteMany({})
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /movement', () => {
    test('Should return 200 on signup', async () => {
      const res = await request(app)
        .post('/api/signup')
        .send({
          name: 'Marcelo',
          email: 'teste@gmail.com',
          password: '123',
          passwordConfirmation: '123',
          roles: ['admin']
        })
        .expect(200)
      const { token } = res.body

      const insertMovement = await movementTypeCollection.insertOne({
        name: 'Deposito',
        type: 'in'
      })
      const movementType = mongoHelper.map(insertMovement.ops[0]).id
      const account = await accountCollection.findOne({})
      await request(app)
        .post('/api/movement')
        .set('x-access-token', token)
        .send({
          accountId: account._id, movementType, value: 20
        })
        .expect(200)
    })
  })
})
