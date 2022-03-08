const mongoose = require('mongoose')

const BusinessObjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    product_type: {
      type: String
    },
    user_id: {
      type: String,
      required: true
    },
    presentation_content: {
      type: String
    },
    content: {
      type: String
    },
    slug: {
      type: String
    },
    url_photo: {
      type: String
    },
    url_video: {
      type: String
    },
    url_banner: {
      type: String
    },
    is_current: {
      type: Boolean
    },
    description: {
      type: String,
      required: true,
      lowercase: true
    },
    userData: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        required: true
      }
    },
    
  },
  {
    timestamps: true
  }
)


module.exports = mongoose.model('BusinessOject', BusinessObjectSchema)
