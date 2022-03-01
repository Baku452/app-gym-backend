const user = require('./api/user')
const product = require('./api/product')

function routes(app) {
  app.use('/api/v1/users', user)
  app.use('/api/v1/products', product)
}

module.exports = routes




