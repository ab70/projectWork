const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
const packageControllers = require('../../app/controllers/packageControllers')


//add new package post
router.post('/addpackage',packageControllers().addNewPackage)

/* A route that is used to get all packages. */
router.get('/getallpackage', packageControllers().getAllPackages)
router.get('/getapackage/:id', packageControllers().getPackageInfo)
router.post('/editpackage', packageControllers().editPackage)







module.exports = router