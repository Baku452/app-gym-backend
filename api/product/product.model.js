const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    product_type: {
      type: String
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


module.exports = mongoose.model('Product', ProductSchema)
