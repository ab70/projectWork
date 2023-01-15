const express =require('express')
const router = express.Router()
const countControllers = require('../../app/controllers/countControllers')

//add inside count variable both total and paid
router.post('/addcount/:id',countControllers().addClick)


module.exports = router