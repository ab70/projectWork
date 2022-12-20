const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
const productControllers = require('../../app/controllers/productControllers')

// Add product
router.post('/addproduct',uploads.array('prodimg',5), productControllers().addNewProduct)
router.get('/products', productControllers().getAllProduct)
router.get('/product/:emailphone' , productControllers().getAlUser)

module.exports = router