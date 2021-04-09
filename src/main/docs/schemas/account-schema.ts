export const accountSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string'
    },
    balance: {
      type: 'number'
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    },
    id: {
      type: 'string'
    }
  },
  required: ['userId', 'balance', 'createdAt', 'updatedAt', 'id']
}
