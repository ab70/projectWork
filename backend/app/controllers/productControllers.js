const ProductSchema = require('../models/Product')
const UserSchema = require('../models/User')

function productControllers(){
    return{
        //Add new product 
        async addNewProduct(req,res){
            try{
                // await ProductSchema.deleteMany()
                console.log(req.body);
                console.log(req.files[0].filename);
                let databody = new ProductSchema(req.body)
                
                req.files.forEach(e => {
                    databody.productImg.push({img: e.filename})
                });
                console.log(databody);
                const postproduct = await databody.save()
                if(postproduct){
                    res.status(200).json({success: true, message: "Product Saved", data: databody})
                }
                else{
                    res.status(401).json({success: false, message: "Product couldn't save", data:databody})
                }
      
            }
            catch(err){
                res.status(404).json({success: false, message: err, data: databody})
            }
        },
        //get all product
        async getAllProduct(req,res){
            try{
                const prodData = await ProductSchema.find({})
                if(prodData){
                    res.status(200).json({success: true, message: "Product fetched", data:prodData })
                }
                else{
                    res.status(401).json({success: false, message: "Product couldn't fetch",})
                }
            }
            catch(err){
                res.status(200).json({success: false, message: err,})
            }
        },
        //get userId for product
        async getAlUser(req,res){
            try{
                const findUser = await UserSchema.findOne({$or: [{email: req.params.emailphone},{phone: req.params.emailphone}]},{"name":1})
                findUser ? res.status(200).json({success:true, message: "found user", data: findUser})
                :
                res.status(401).json({success:false, message: "user not found"})

            }
            catch(err){
                res.status(404).json({success:false, message: "user not found"})
            }
        },
        //approve picture of product img
        async productImgApprove(req,res){
            try{
                let findObj = await ProductSchema.update({"productImg._id": req.body.id},{"$set":{"productImg.$.approved":req.body.approved}})
                findObj ? res.status(200).json({ success:true, message:"found", data: findObj})
                :
                res.status(401).json({ success:false, message:"not found", data: findObj})
            }
            catch(err){
                res.status(404).json({ success:false, message:"found", data: findObj})
            }
        }
    }
}




module.exports = productControllers