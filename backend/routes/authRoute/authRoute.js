const express =require('express')
const router = express.Router()
const authControllers = require('../../app/controllers/authControllers')

router.post('/register', authControllers().registerUser)


module.exports = router