const express =require('express')
const router = express.Router()

const adminControllers = require('../../app/controllers/adminControllers')

router.post('/addparent', adminControllers().addParentCategory)
router.get('/allparentcat', adminControllers().getAllParentCategory)
router.get('/alluser', adminControllers().getAllUser)
router.get('/getuser/:id', adminControllers().getAusersData)

//feature
router.post('/createfeature', adminControllers().createFeature)
router.get('/allfeatures', adminControllers().getAllFeatures)


module.exports = router