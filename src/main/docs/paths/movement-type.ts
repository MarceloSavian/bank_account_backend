export const movementTypePath = {
  get: {
    tags: ['MovementTypes'],
    summary: 'Get all movement types',
    security: [{
      apiKeyAuth: []
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/movementTypes'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/serverError'
      },
      500: {
        $ref: '#/components/unauthorized'
      }
    }
  }
}
