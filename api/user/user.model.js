const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true
    },
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
      default: 'pending',
      enum: ['deleted', 'active', 'pending'],
      required: true
    },
    role: {
      type: String,
      enum: ['guest','user','trainer','admin'],
      default: 'guest',
    },
    identityDocument: {
      type: String,
      enum: ['dni', 'ruc', 'foreigner'],
      lowercase: true
    },
    identityNumber: {
      type: String,
      lowercase: true
    },
    slug: {
      type: String,
      lowercase: true,
    },
    presentation: {
      type: String,
      lowercase: true,
    },
    urlPhoto: {
      type: String,
      lowercase: true,
    },
    urlBanner: {
      type: String,
      lowercase: true,
    },
    gender: {
      type: String,
      lowercase: true,
    },
    emailAlternative: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      lowercase: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
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
  return await bcrypt.hash(password, 10);
}

UserSchema.virtual('profile').get(function() {
  const { firstName, lastName, email } = this

  return { fullName: `${firstName} ${lastName}`, email }
})

module.exports = mongoose.model('User', UserSchema)
