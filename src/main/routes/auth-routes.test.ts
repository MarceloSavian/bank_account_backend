import { Collection } from 'mongodb'
import request from 'supertest'
import { mongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let userCollection: Collection

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
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Marcelo',
          email: 'teste@gmail.com',
          password: '123',
          passwordConfirmation: '123',
          roles: ['admin']
        })
        .expect(200)
    })
  })
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Marcelo',
          email: 'teste@gmail.com',
          password: '123',
          passwordConfirmation: '123',
          roles: ['admin']
        })
      await request(app)
        .post('/api/login')
        .send({
          email: 'teste@gmail.com',
          password: '123'
        })
        .expect(200)
    })
    test('Should return 401 if invalid credentials are provided', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'teste@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
