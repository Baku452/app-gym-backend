const Product = require('./product.model')

async function getAllProducts(req, res) {
  const { page, limit, find } = req.query

  const skip = limit * ( page - 1)

  try {
    // con los usuarios
    const findValue = new RegExp(find, "gi") || undefined
    const product = await Product.find({ name: findValue}, { name: 1, description: 1}).skip(skip).limit(limit)
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}


async function getProductById(req, res) {
  const { id } = req.params
  try {
    const product = await Product.findById(id) 
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function createProduct(req, res) {
  const info = req.body;
  const user = req.user
  console.log("🚀 ~ file: product.controller.js ~ line 28 ~ createProduct ~ info", user)
  
  try {
    const product = await Product.create({ ...info, userData: { user, role: user.role} })
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  } 
}

async function updateProduct(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params
  try {
    const product = await Product.findByIdAndDelete(id)
    res.status(200).json({ message: 'Product deleted succesfully', product })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}