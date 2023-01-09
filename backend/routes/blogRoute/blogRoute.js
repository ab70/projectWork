const express =require('express')
const router = express.Router()
const uploads = require('../../app/middlewares/uploads')
const {auth} = require('../../app/middlewares/authMiddlewares')
const blogControllers = require('../../app/controllers/blogControllers')


/* Creating a new blog post */
router.post('/blog', auth, uploads.any(), blogControllers().addNewBlog)
router.get('/blogs', blogControllers().getAllBlog)
router.get('/getblog/:id',blogControllers().getAblogInfo)
router.post('/editblog',uploads.any(), blogControllers().editBlog)
router.delete('/deleteblog/:id', blogControllers().deleteBlog)





module.exports = router