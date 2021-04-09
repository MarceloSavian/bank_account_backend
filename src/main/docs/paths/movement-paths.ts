export const movementPath = {
  post: {
    tags: ['Movement'],
    summary: 'Movements Routes',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/movementParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {}
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
