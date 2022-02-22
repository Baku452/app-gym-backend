const cloudinary = require('cloudinary').v2
const fs = require('fs')

async function uploadHandler(req, res) {
  const { file } = req

  const size = file.size / 1024 / 1024

  if (size > 5) {
    return res.
            status(500).
            json({ message: 'File size is too long'})
  }

  try {
    // enviar nuestro archivo a cloudinary
    cloudinary.uploader.destroy()
    const result = await cloudinary.uploader.upload(file.path)
    const result = await cloudinary.uploader.upload_stream(file.path)
   //chunks // asociar una imagen, algun dato de DB
    return res.status(200).json(result)
  } catch(err) {
    console.log(err)
  } finally {
    fs.unlinkSync(file.path)
  }
}

async function uploadMultipleFileHandler(req, res) {
  const { files } = req
  console.log(files)

  const results = []

  for (const file of files) {
    const size = file.size / 1024 / 1024

    if (size > 5) {
      return res.
              status(500).
              json({ message: 'File size is too long'})
    }
    try {
      // enviar nuestro archivo a cloudinary
      const result = await cloudinary.uploader.upload(file.path)
      // asociar una imagen, algun dato de DB
      results.push(result)
    } catch(err) {
      console.log(err)
    } finally {
      fs.unlinkSync(file.path)
    }
  }

  return res.status(200).json(results)
  
}

module.exports = {
  uploadHandler,
  uploadMultipleFileHandler
}