import { AddSessionRepository } from '@/data/protocols/db/session/add-session-repository'
import { LoadSessionByTokenRepository } from '@/data/protocols/db/session/load-session-by-token'
import { SessionModel } from '@/domain/models/session'
import { mongoHelper } from '../helpers/mongo-helper'

export class SessionMongoRepository implements AddSessionRepository, LoadSessionByTokenRepository {
  async add (token: string, expireAt: Date, id: string): Promise<void> {
    const sessionCollection = await mongoHelper.getCollection('sessions')
    await sessionCollection.insertOne({ token, expireAt, userId: id })
  }

  async loadByToken (token: string): Promise<SessionModel | null> {
    const sessionCollection = await mongoHelper.getCollection('sessions')
    const session = await sessionCollection.findOne({ token })
    return session && mongoHelper.map(session)
  }
}
