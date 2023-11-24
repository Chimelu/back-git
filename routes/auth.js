const express = require("express");
const router = express.Router()

const {newUser,login} = require('../controllers/authController')

router.post('/register',newUser)
router.post('/login',login)

module.exports = router   