const { Router } = require('express');
const { loginUserHandler,changePasswordHandler } = require('./local.controller')

const router = Router()


router.post('/login', loginUserHandler)
router.post('/change-password', changePasswordHandler)
router.post('/register', loginUserHandler)
router.post('/verify-email', loginUserHandler)


module.exports = router