import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { mockAddAccountRepository } from '@/data/test/mock-db-account'
import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
}

const mockSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepository()
  return {
    sut: new DbAddAccount(addAccountRepositoryStub),
    addAccountRepositoryStub
  }
}

describe('DbAddAccount', () => {
  test('Ensure calls AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add('any_id')
    expect(addSpy).toHaveBeenCalledWith('any_id', 0)
  })
  test('should throws if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add('any_id')
    await expect(promise).rejects.toThrow()
  })
  test('should returns null if succeds', async () => {
    const { sut } = mockSut()
    const value = await sut.add('any_id')
    expect(value).toBeFalsy()
  })
})
