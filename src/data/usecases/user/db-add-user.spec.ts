import { DbAddUser } from './db-add-user'
import { mockUserParams } from '@/domain/test'
import { mockHasher } from '@/data/test'
import { Hasher } from '@/data/protocols/criptography/hasher'

type SutTypes = {
  sut: DbAddUser
  hasherStub: Hasher
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  return {
    sut: new DbAddUser(hasherStub),
    hasherStub
  }
}

describe('DbAddUser UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()

    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockUserParams())
    expect(encryptSpy).toHaveBeenCalledWith(mockUserParams().password)
  })
  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = mockSut()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockUserParams())
    await expect(promise).rejects.toThrow()
  })
})
