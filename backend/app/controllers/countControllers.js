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
        //Update count of all products that was served / reach count
        async addReachCount(req,res){
            try{
                const bodyData = req.body.products
                const reachCount = await ProductSchema.updateMany({_id: {$in:bodyData}},{$inc:{"total.reach":1,"paid.reach":1}},{multi:true})
                reachCount ? res.status(200).json({success:true,message: "Reach served"})
                :
                res.status(404).json({success:false,message: "Reach no served"});

            }
            catch(err){
                console.log(err.message);
                res.status(500).json({success:false,message:err.message});
            }
        } 
    }
}

module.exports = countControllers