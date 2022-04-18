const mongoose = require('mongoose')
const slugify = require('slugify')

const BusinessObjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    business_object_type: {
      type: String,
      enum: ['product','course','blog'],
      required: true,
    },
    content: {
      type: String
    },
    slug: {
      type: String
    },
    url_image: {
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
    price: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      default: 0
    }
    // userData: {
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //   },
    //   role: {
    //     type: String,
    //     required: true
    //   }
    // },
    
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('BusinessObject', BusinessObjectSchema)
