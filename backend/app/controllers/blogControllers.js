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
        },
        //delete a blog
        async deleteBlog(req,res){
            try {
                const deleteData = await BlogSchema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                :
                res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        },
        //get a blog info
        async getAblogInfo(req,res){
            try {
                const getData = await BlogSchema.find({ _id: req.params.id })
                getData ? res.status(200).json({ success: true, message: "Blog Found", data: getData })
                    :
                    res.status(401).json({ success: false, message: "Blog couldn't Found" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Blog couldn't Found" })
            }
        },
        //edit blog
        async editBlog(req,res){
            try {
                if (!req.files) {
                    let id = req.body._id
                    let databody = req.body
                    delete databody._id
                    let editedData = await BlogSchema.findOneAndUpdate({ "_id": id }, databody)
                    editedData ? res.status(200).json({ success: true, message: "Edited done data" })
                    :
                    res.status(401).json({ success: false, message: "Edited not successful."})
                }
                else {
                    let id = req.body._id
                    let databody = req.body
                    delete databody._id
                   
                    let imgData =[]
                    let i = 0
                    req.files.forEach(e => {
                        imgData.push(e.filename)
                    });
                    let editedData = await BlogSchema.findOneAndUpdate({ "_id": id }, databody)
                    let imgUpdate = await BlogSchema.findOneAndUpdate({"_id":id},{$push:{images:{$each:imgData}}})
                    editedData ? res.status(200).json({ success: true, message: "Data updated with image" })
                    :
                    res.status(401).json({ success: false, message: "Data update failed" })
                }
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ success: false, message: err })
            }
        }
    }
}

module.exports = blogControllers