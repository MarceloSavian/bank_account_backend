export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/bank-account-management',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRECT ?? 'tk670==5H'
}
