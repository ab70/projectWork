const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
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

//categorys
router.get('/getallcategory', adminControllers().getAllCategory)
router.post('/addcategory', uploads.single('categoryImg'), adminControllers().addCategory)
router.post('/editcategory', adminControllers().editCategory)

//subcategory with feature select
router.post('/addsubcategory', adminControllers().addSubcategory)
router.get('/allsubcategory', adminControllers().getAllSubCategories)


module.exports = router