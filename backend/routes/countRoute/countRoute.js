const express =require('express')
const router = express.Router()
const countControllers = require('../../app/controllers/countControllers')

//add inside count variable both total and paid
router.post('/addcount/:id',countControllers().addClick)
/* Add reach to all the list of product that was delivered */
router.post('/addreach',countControllers().addReachCount)



module.exports = router