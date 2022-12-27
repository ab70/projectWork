const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
const productControllers = require('../../app/controllers/productControllers')
const adminControllers = require('../../app/controllers/adminControllers')

// Add product
router.post('/addproduct',uploads.any(), productControllers().addNewProduct)
router.get('/products', productControllers().getAllProduct)
router.get('/product/:emailphone' , productControllers().getAlUser)
//get product
router.get('/products/:id', productControllers().getAProduct)



//product img 
router.post('/approvephoto', productControllers().productImgApprove)
router.post('/productimgdelete', productControllers().deletePhoto)

//update product
router.post('/updateproduct', uploads.any(), productControllers().editproduct)



//location
router.get('/alllocations', productControllers().getAllLocationNsubLocation)

/* A route that will be used to get all locations. */
router.get('/location', productControllers().getAllLocations)
/* A route that will be used to add a location. */
router.post('/location', uploads.none(), productControllers().addLocation)
/* A route that will be used to get a location. */
router.get('/getalocation/:id', productControllers().getAlocation)
/* A route that will be used to edit a location. */
router.post('/editlocation', uploads.none(), productControllers().editLocation)
/* Deleting a location. */
router.delete('/deletelocation/:id',productControllers().deleteLocation)


router.post('/postsublocation',uploads.none(), productControllers().addSublocation)
router.get('/getsublocation/:id', productControllers().getAllSubLocationsunderLocation)
router.get('/getasublocation/:id', productControllers().getAsublocation)
router.post('/editsublocation',uploads.none(), productControllers().editSublocation)
router.delete('/deletesublocation/:id',productControllers().deleteSublocation)


//buttons
router.get('/buttons', productControllers().getButtons)


module.exports = router