import { AddUser } from '@/domain/usecases/user/add-user'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addUser: AddUser,
    private readonly validation: Validation
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

      return ok(response.user)
    } catch (error) {
      return serverError(error)
    }
  }
}
