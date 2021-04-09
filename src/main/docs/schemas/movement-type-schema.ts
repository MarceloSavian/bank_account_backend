export const movementTypeSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  },
  required: ['name', 'type']
}
