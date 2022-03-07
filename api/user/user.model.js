const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: true
    },
    lastName: {
      type: String,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Deleted', 'Active', 'Pending'],
      required: true
    },
    role: {
      type: String,
      default: 'GUEST',
    },
  
    slug: {
      type: String,
      lowercase: true,
    },
    url_photo: {
      type: String,
      lowercase: true,
    },
    url_banner: {
      type: String,
      lowercase: true,
    },
    gender: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
      lowercase: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function(next) {
  const user = this
  try {
    if (!user.isModified('password')) {
      return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    console.log(hash);
    user.password = hash

  } catch(error) {
    next(error)
  }
  next()
})

UserSchema.methods.comparePassword = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

UserSchema.methods.changePassword = async function (password){
  const user = this;
  user.password = password;
}

UserSchema.virtual('profile').get(function() {
  const { firstName, lastName, email } = this

  return { fullName: `${firstName} ${lastName}`, email }
})

module.exports = mongoose.model('User', UserSchema)
