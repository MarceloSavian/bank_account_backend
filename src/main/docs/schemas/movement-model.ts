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
    id: {
      type: 'string'
    }
  },
  required: ['movementType', 'value', 'date']
}
