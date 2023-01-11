const express =require('express')
const router = express.Router()

const productBoost = require('../../app/controllers/productBoost')

router.get('/getboostprice/:id', productBoost().getPrice)





module.exports = router
