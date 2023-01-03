const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
const {auth} = require('../../app/middlewares/authMiddlewares')
const blogControllers = require('../../app/controllers/blogControllers')


/* Creating a new blog post */
router.post('/blog', auth, uploads.any(), blogControllers().addNewBlog)
router.get('/blogs', blogControllers().getAllBlog)





module.exports = router