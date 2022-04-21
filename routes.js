const user = require('./api/user')
const pkg = require('./package.json')
const businessObject = require('./api/business_object')
const session = require('./api/session')
const upload = require('./api/upload')
const auth = require('./auth/local')
const payment = require('./payment/checkout')

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

  app.use('/api/v1/users', user)
  app.use('/api/v1/sessions', user)
  app.use('/api/v1/business-objects', businessObject),
  app.use('/api/v1/uploads', upload),
  app.use('/api/v1/auth', auth)
  app.use('/api/v1/payment', payment)
}

module.exports = routes




