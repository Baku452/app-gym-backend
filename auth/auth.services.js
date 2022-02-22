const jsonwebtoken = require('jsonwebtoken')
const { getUserByEmail } = require('../api/user/user.service')
const compose = require('composable-middleware')
const { createProduct } = require('../api/product/product.controller')

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, 'private_key', {
    expiresIn: '1h'
  })

  return token
}

function isAuthenticated() {
  return compose().use(async (req, res, next) => {
    const authHeader = req.headers?.authorization
    console.log('Llego aqui')
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  
    // proceder a validar que el token no se haya expirado
    //const token = authHeader.split(' ')[1] //1
    const [, token] = authHeader.split(' ')
    const payload = await validateToken(token)
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  
    const user = await getUserByEmail(payload.email)
  
    if (!user){
      return res.status(401).json({ message: 'User not found' })
    }
  
    req.user = user
    next()
  })
}

async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, 'private_key')
    return payload
  } catch(err) {
    return null
  }
}

function hasRole(roles) {
  return compose()
    .use(isAuthenticated())
    .use(async (req, res, next)=> {
      const { user } = req
      if (!roles.includes(user.role))  {
        return res.status(403).json({ message: 'forbidden' })
      } 
      next()   
    })
}

module.exports = {
  signToken,
  isAuthenticated,
  hasRole
}