import { badRequest, serverError, unauthorized, forbidden } from './components/'
import { loginPath, signUpPath, movementPath } from './paths/'
import {
  userSchema,
  loginSchema,
  errorSchema,
  apiKeyAuthSchema,
  signUpParamsSchema,
  movementParamsSchema
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
    name: 'Movement'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/movement': movementPath
  },
  schemas: {
    user: userSchema,
    'login-params': loginSchema,
    error: errorSchema,
    signUpParams: signUpParamsSchema,
    movementParams: movementParamsSchema
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
