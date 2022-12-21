function userProductControllers(){
    return{
        //product upload by user and check if he got that space to post
        async addProduct(req,res){
            try{
                let id = req.userid
                let databody = new ProductSchema(req.body)
                databody.userId = id
                req.files.forEach(e => {
                    databody.productImg.push({img: e.filename})
                });
                const saveProduct = await databody.save()
                //check if it can be published or not
                let allPostOfUserInThisMonth = await ProductSchema.find()



                //
                saveProduct ? res.status(200).json({success: true, message: "Ad posted successfully..!"})
                :
                res.status(401).json({success: false, message: "Ad posted failed..!"})
            }
            catch(err){
                res.status(404).json({success: true, message: err})
            }
        }
    }
}