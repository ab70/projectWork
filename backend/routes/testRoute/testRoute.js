const express =require('express')
const router = express.Router()
const testControllers = require('../../app/controllers/testControllers')

router.get('/test', testControllers().showData)


module.exports = router