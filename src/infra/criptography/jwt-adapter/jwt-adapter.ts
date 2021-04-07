import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) { }

  async encrypt (value: string | object, expiresIn?: string): Promise<string> {
    if (!expiresIn) return jwt.sign({ id: value }, this.secret)
    return jwt.sign({ id: value }, this.secret, { expiresIn })
  }

  async decrypt (token: string): Promise<string | object | null> {
    const value = await jwt.verify(token, this.secret)
    return value
  }
}
