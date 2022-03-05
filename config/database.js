require("dotenv").config()

const mongoose = require("mongoose")

const URI = process.env.MONGO_URI

async function connectDB() {
 try {
  await mongoose.connect(URI)
  console.log("MongoDB is connected")
 } catch (err) {
  console.log(err)
  process.exit(1)
 }
}

module.exports = connectDB
