const ProductSchema = require('../models/Product')
function productControllers(){
    return{
        //Add new product 
        async addNewProduct(req,res){
            try{
                await ProductSchema.deleteMany()
                let databody = new ProductSchema(req.body)
                
                req.files.forEach(e => {
                    databody.productImg.push({img: e.filename})
                });
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
        }
    }
}

module.exports = productControllers