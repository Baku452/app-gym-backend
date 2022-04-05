const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllBusinessObjects,
  getBusinessObjectById,
  createBusinessObject,
  updateBusinessObject,
  deleteBusinessObject
} = require('./business_object.controller')

const router = Router()

//CRUD
router.post('/products', hasRole(['admin']), createBusinessObject)
// router.get('/', isAuthenticated(), getAllBusinessObjects)
router.get('/', getAllBusinessObjects)
// router.get('/:id', isAuthenticated(), getBusinessObjectById)
router.get('/:id', getBusinessObjectById)
// router.post('/', hasRole(['Developer', 'Admin']), createBusinessObject)
// router.post('/',isAuthenticated(), createBusinessObject)
router.post('/', createBusinessObject)
router.put('/:id', updateBusinessObject)
// router.delete('/:id', hasRole('Developer'), deleteBusinessObject)
router.delete('/:id', deleteBusinessObject)

//Products
// router.get('/products/', getAllBusinessObjects)

module.exports = router
