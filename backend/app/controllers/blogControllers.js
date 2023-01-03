const BlogSchema = require('../models/Blog')
function blogControllers(){
    return{
        //add new blog
        async addNewBlog(req,res){
            try {
                // await ProductSchema.deleteMany()
                console.log(req.body);
                if (!req.files) {
                    console.log("Files not found");
                }
                else {
                    console.log("Files found");
                }
                let databody = new BlogSchema(req.body)
                databody.userId = req.userid

                /* Finding the count of the documents in the collection and adding 1 to it. */
                let countObj = await BlogSchema.find().count() +1
                databody.ordering = countObj

                let i = 0
               
                req.files.forEach(e => {
                    databody.images.push(e.filename)
                });
                console.log(databody);
                const blogpost = await databody.save()
                if (blogpost) {
                    res.status(200).json({ success: true, message: "Blog Saved", data: databody })
                }
                else {
                    res.status(401).json({ success: false, message: "Blog couldn't save", })
                }

            }
            catch (err) {
                console.log(err);
                res.status(404).json({ success: false, message: err.message, })
            }
        },
        //get all blogs
        async getAllBlog(req,res){
            try{
                const blog = await BlogSchema.find({})
                blog ? res.status(200).json({success: true, message: "Saved"})
                :
                res.status(401).json({success: false, message:"Can't save"})
            }
            catch(err){
                res.status(404).json({success: false, message:err.message})
            }
        }
    }
}

module.exports = blogControllers