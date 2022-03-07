const user = require('./api/user')
const product = require('./api/product')
const auth = require('./auth/local')
const pkg = require('./package.json')

function routes(app) {
  app.set('pkg', pkg)
  app.get('/', (req, res) => {
    res.json({
      name: app.get('pkg').name,
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version
    })
  })
  app.use('/api/auth', auth)
  app.use('/api/v1/users', user)
  app.use('/api/v1/products', product)
}

module.exports = routes




