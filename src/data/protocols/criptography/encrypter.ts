export interface Encrypter {
  encrypt: (value: string | object, expiresIn?: string) => Promise<string>
}
