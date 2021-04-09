import { Collection } from 'mongodb'
import request from 'supertest'
import { mongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let userCollection: Collection
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
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('GET /account', () => {
    test('Should return 200 on account', async () => {
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
      await request(app)
        .get('/api/account')
        .set('x-access-token', token)
        .expect(200)
    })
  })
})
