import { AddUser } from '@/domain/usecases/user/add-user'
import { forbidden, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addUser: AddUser
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, roles } = httpRequest.body

    const response = await this.addUser.add({
      name,
      email,
      password,
      roles
    })

    if (response.error) return forbidden(response.error)

    return ok(response.user)
  }
}
