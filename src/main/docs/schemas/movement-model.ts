export const movementModelSchema = {
  type: 'object',
  properties: {
    movementType: {
      $ref: '#/schemas/movementType'
    },
    value: {
      type: 'number'
    },
    date: {
      type: 'string'
    },
    balance: {
      type: 'number'
    },
    id: {
      type: 'string'
    }
  },
  required: ['movementType', 'value', 'date']
}

export const movementsModelSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/movementModel'
  }
}
