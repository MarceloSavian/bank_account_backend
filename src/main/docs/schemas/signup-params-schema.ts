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
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['email', 'password', 'passwordConfirmation', 'name', 'roles']
}
