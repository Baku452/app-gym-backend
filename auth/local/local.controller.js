const { signToken } = require('../auth.services')
const User = require('../../api/user/user.model')

async function loginUserHandler(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
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
    return res.status(500).json({ error })
  }
}

async function changePasswordHandler(req, res){
  const {email, password} = req.body;
  try{
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      const newPassword = await user.changePassword(password);
      const updatedInfo = {
        password: newPassword
      }
      const userUpdated = await User.findByIdAndUpdate(user.id, updatedInfo, { new:true })
      return res.status(200).json(userUpdated)
    }else{
      return res.status(500).json({ message: "Cannot use the same password"})
    }

  }  catch(error) {
    return res.status(500).json({ error })
  }
}

function verifyToken(req, res) {
  //;;
}

module.exports = {
  loginUserHandler,
  changePasswordHandler
}
