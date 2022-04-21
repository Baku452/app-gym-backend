require("dotenv").config()

const { Router } = require('express');
const { createCheckout } = require('./checkout.controller')
const router = Router()

router.post('/create-checkout-session', createCheckout)

module.exports = router
