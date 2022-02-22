const User = require('./user.model')

async function getUserByEmail(email) {
  const user = await User.findOne({ email }) || {}
  return user
}

module.exports = {
  getUserByEmail
}


