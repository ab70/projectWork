const ProductSchema = require('../models/Product')

function countControllers(){
    return{
        //on click count click
        async addClick(req,res){
            try{
                let id = req.params.id
                let findProduct = await ProductSchema.find({_id:id})
                if(findProduct.length()>0){
                    if(findProduct.boosted==true){
                        let totalClick = Number(findProduct.total.click)+1
                        let paidClick = Number(findProduct.paid.click)+1
                        const updateData = await ProductSchema.findOneAndUpdate({"_id":id},{"$set":{"total.click":totalClick,"paid.click":paidClick}})
                        updateData ? res.status(200).json({success:true,message:"updated count"})
                        :
                        res.status(401).json({success:false,message:"Cant update count"})
                    }
                    else{
                        let totalClick = Number(findProduct.total.click)+1
                        const updateData = await ProductSchema.findOneAndUpdate({"_id":id},{"$set":{"total.click":totalClick}})
                        updateData ? res.status(200).json({success:true,message:"updated count"})
                        :
                        res.status(401).json({success:false,message:"Cant update count"})
                    }
                }
            }
            catch(err){
                res.status(500).json({success:false,message:err.message})
            }
        },
        
    }
}

module.exports = countControllers