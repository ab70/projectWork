const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
const packageControllers = require('../../app/controllers/packageControllers')


//add new package post
router.post('/addpackage',packageControllers().addNewPackage)







module.exports = router