import { Encrypter } from '@/data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) { }

  async encrypt (value: string | object, expiresIn?: string): Promise<string> {
    if (!expiresIn) return jwt.sign({ id: value }, this.secret)
    return jwt.sign({ id: value }, this.secret, { expiresIn })
  }
}
