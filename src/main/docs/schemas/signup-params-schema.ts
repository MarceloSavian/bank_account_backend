export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    },
    roles: {
      type: 'object'
    }
  },
  required: ['email', 'password', 'passwordConfirmation', 'name', 'roles']
}
