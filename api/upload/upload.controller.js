const cloudinary = require("cloudinary").v2;
const fs = require("fs");

async function uploadHandler(req, res) {
  const { file,  body } = req;
  let storedPath = "general";

  const size = file.size / 1024 / 1024;

  if (file.mimetype.startsWith("image/") && size > 5) return res.status(500).json({ message: "File size is too long" });
  

  if (file.mimetype.startsWith("image/")) storedPath = "images/";
  if (file.mimetype.startsWith("video/")) storedPath = "videos/";

  if ( body.target == "blog") storedPath+="blogs";
  if ( body.target == "course") storedPath+="courses";
  if ( body.target == "product") storedPath+="products";


  try {
    // enviar nuestro archivo a cloudinary
    cloudinary.uploader.destroy();
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `app-gym/${storedPath}`,
      resource_type: 'auto'
    });
    // const result = await cloudinary.uploader.upload_stream(file.path)
    //chunks // asociar una imagen, algun dato de DB
    return res.status(200).json(result);
    } catch (err) {
    return res.status(400).json({error: "File not saved"});
  } finally {
    fs.unlinkSync(file.path);
  }
}

async function uploadMultipleFileHandler(req, res) {
  const { files } = req;

  const results = [];

  for (const file of files) {
    const size = file.size / 1024 / 1024;

    if (size > 5) {
      return res.status(500).json({ message: "File size is too long" });
    }
    try {
      // enviar nuestro archivo a cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "app-gym/product",
      });
      // asociar una imagen, algun dato de DB
      results.push(result);
    } catch (err) {
      console.error(err);
    } finally {
      fs.unlinkSync(file.path);
    }
  }

  return res.status(200).json(results);
}

module.exports = {
  uploadHandler,
  uploadMultipleFileHandler,
};
