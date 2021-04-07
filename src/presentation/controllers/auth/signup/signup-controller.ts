import { AddAccount } from '@/domain/usecases/account/add-account'
import { AddUser } from '@/domain/usecases/user/add-user'
import { Authentication } from '@/domain/usecases/user/authentication'
import { badRequest, forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addUser: AddUser,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password, roles } = httpRequest.body

      const response = await this.addUser.add({
        name,
        email,
        password,
        roles
      })

      if (response.error) return forbidden(response.error)

      if (!response.user) return unauthorized()

      await this.addAccount.add(response.user.id)

      const auth = await this.authentication.auth({
        email,
        password
      })

      return ok(auth)
    } catch (error) {
      return serverError(error)
    }
  }
}
