const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema(
  {
    instructorId: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean
    },
  },
  {
    timestamps: true
  }
)


module.exports = mongoose.model('Session', SessionSchema)
