const express =require('express')
const router = express.Router()
const authControllers = require('../../app/controllers/authControllers')

router.post('/register', authControllers().registerUser)
router.post('/login', authControllers().loginUser)

module.exports = router