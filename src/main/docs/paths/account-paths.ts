export const accountPath = {
  get: {
    tags: ['Account'],
    summary: 'Get user account',
    security: [{
      apiKeyAuth: []
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
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
