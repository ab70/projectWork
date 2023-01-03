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
router.delete('/deletepackage/:id',packageControllers().deletepackage)

                  ////////////////////////////////*** VAT Routes ****/////////////////////  
//add or edit vat
router.post('/addvat', packageControllers().VatController)
//Get vat info
router.get('/vat', packageControllers().getAllVat)

                 ////////////////////////////////*** Bonus and Coupones ****/////////////////////  
router.get('/coupon', packageControllers().getAllCoupons)
router.post('/coupon', packageControllers().bonusCoupone)
router.post('/editcoupone', packageControllers().editBonusCoupone)
router.delete('/deletecoupon/:id', packageControllers().deleteCoupons)

//Sorting package
router.get('/sort', packageControllers().getAllSort)
router.post('/sort', packageControllers().addSorting)
router.post('/editsort', packageControllers().editSort)
router.delete('/deletesort/:id',packageControllers().deleteSort)

module.exports = router