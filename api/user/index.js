const { Router } = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail, loginUserHandler } = require('./user.controller')
const { isAuthenticated } = require('../../auth/auth.services') 
const router = Router()

//CRUD
router.get('/', isAuthenticated, getAllUsers)
router.get('/:id', isAuthenticated, getUserById)
router.post('/', createUser)
router.put('/:id', isAuthenticated, updateUser)
router.delete('/:id', isAuthenticated, deleteUser)


module.exports = router