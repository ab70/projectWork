const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
const productControllers = require('../../app/controllers/productControllers')
const adminControllers = require('../../app/controllers/adminControllers')

// Add product
router.post('/addproduct',uploads.array('prodimg',5), productControllers().addNewProduct)
router.get('/products', productControllers().getAllProduct)
router.get('/product/:emailphone' , productControllers().getAlUser)

//location
router.get('/location', adminControllers().location)

//product img 
router.post('/approvephoto', productControllers().productImgApprove)


module.exports = router