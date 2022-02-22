const { signToken } = require('../auth.services')
const User = require('../../api/user/user.model')

async function loginUserHandler(req, res) {
  const { email, password } = req.body
  console.log("🚀 ~ file: user.controller.js ~ line 80 ~ loginUserHandler ~ req.body", req.body)
  try {
    const user = await User.findOne({ email })
    console.log("🚀 ~ file: user.controller.js ~ line 83 ~ loginUserHandler ~ user", user)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(500).json({ message: "Wrong password"})
    }

    const token = signToken(user.profile)
    
    return res.status(200).json({ message: "correct login", token, user: user.profile })


  } catch(error) {
    console.log("🚀 ~ file: user.controller.js ~ line 104 ~ loginUserHandler ~ error", error)
    return res.status(500).json({ error })
  }
}

function verifyToken(req, res) {
  //;;
}

module.exports = {
  loginUserHandler
}