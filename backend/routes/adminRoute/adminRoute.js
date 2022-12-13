const express =require('express')
const router = express.Router()

const adminControllers = require('../../app/controllers/adminControllers')

router.post('/addparent', adminControllers().addParentCategory)
router.get('/allparentcat', adminControllers().getAllParentCategory)
router.get('/alluser', adminControllers().getAllUser)

module.exports = router