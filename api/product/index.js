const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./product.controller')

const router = Router()

//CRUD
router.get('/', getAllProducts)
router.get('/:id', isAuthenticated(), getProductById)
router.post('/', hasRole(['Developer', 'Admin']), createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', hasRole('Developer'), deleteProduct)


module.exports = router