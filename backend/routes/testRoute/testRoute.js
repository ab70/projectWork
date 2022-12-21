const express =require('express')
const router = express.Router()
const testControllers = require('../../app/controllers/testControllers')

router.post('/test', testControllers().showData)


module.exports = router