import { AddSessionRepository } from '@/data/protocols/db/session/add-session-repository'
import { mongoHelper } from '../helpers/mongo-helper'

export class SessionMongoRepository implements AddSessionRepository {
  async add (token: string, expireAt: Date, id: string): Promise<void> {
    const sessionCollection = await mongoHelper.getCollection('sessions')
    await sessionCollection.insertOne({ token, expireAt, user_id: id })
  }
}
