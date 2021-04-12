export const userSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string'
    },
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        roles: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
  }
}
