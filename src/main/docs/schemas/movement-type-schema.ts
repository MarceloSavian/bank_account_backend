export const movementTypeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  },
  required: ['name', 'type']
}

export const movementTypesSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/movementType'
  },
  required: ['name', 'type']
}
