const express =require('express')
const router = express.Router()
const productBoost = require('../../app/controllers/productBoost')

/* Get products boosting price according to sub category */
router.get('/getboostprice/:id', productBoost().getPrice)

// router.post('/addboostedproduct',productBoost().)





module.exports = router
