export const movementParamsSchema = {
  type: 'object',
  properties: {
    movementType: {
      type: 'string'
    },
    value: {
      type: 'number'
    }
  },
  required: ['movementType', 'value']
}
