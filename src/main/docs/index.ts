import { badRequest, serverError, unauthorized, forbidden } from './components/'
import { loginPath, signUpPath, movementPath, movementTypePath, accountPath } from './paths/'
import {
  userSchema,
  loginSchema,
  errorSchema,
  apiKeyAuthSchema,
  signUpParamsSchema,
  movementParamsSchema,
  movementTypeSchema,
  accountSchema,
  movementModelSchema,
  movementTypesSchema,
  movementsModelSchema
} from './schemas/'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Bank account API',
    description: 'API for simulate a bank account api',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Movements'
  }, {
    name: 'MovementTypes'
  }, {
    name: 'Account'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/movements': movementPath,
    '/movementTypes': movementTypePath,
    '/account': accountPath
  },
  schemas: {
    user: userSchema,
    'login-params': loginSchema,
    error: errorSchema,
    signUpParams: signUpParamsSchema,
    movementParams: movementParamsSchema,
    movementType: movementTypeSchema,
    movementTypes: movementTypesSchema,
    account: accountSchema,
    movementModel: movementModelSchema,
    movementsModel: movementsModelSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    forbidden
  }
}
