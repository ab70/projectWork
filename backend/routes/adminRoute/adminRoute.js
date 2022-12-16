const express =require('express')
const router = express.Router()
const {auth} = require('../../app/middlewares/authMiddlewares')
const adminControllers = require('../../app/controllers/adminControllers')

//

router.post('/addparent', adminControllers().addParentCategory)
router.get('/allparentcat', adminControllers().getAllParentCategory)
router.get('/alluser', adminControllers().getAllUser)
router.get('/getuser/:id', adminControllers().getAusersData)
router.get('/getloggedinuser', auth, adminControllers().getLoggedInUser)

//feature
router.post('/createfeature', adminControllers().createFeature)
router.get('/allfeatures', adminControllers().getAllFeatures)
router.post('/editfeature', adminControllers().editFeature)

//category
router.post('/addcategory', adminControllers().addCategory)
router.post('/editcategory', adminControllers().editCategory)

//subcategory with feature select



module.exports = router