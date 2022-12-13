const ParentCategorySchema = require('../models/ParentCategory')

function adminControllers(){
    return{
        //add new roles
        async addRoles(req,res){
            try{
                
                
            }
            catch(err){
                res.status(400).json({message: "Please try again"})
            }
        },
        async addParentCategory(req,res){
            try{
                const newParent = new ParentCategorySchema(req.body)
                const saveParent = await newParent.save()
                if(saveParent){
                    res.status(200).json({success : true, message: "Parent saved"})
                }
                else{
                    res.status(401).json({success : false, message: "Parent couldn't saved"})
                }
            }
            catch(err){
                res.status(404).json({success : false, message: "Parent couldn't saved with err"})
            }
        },
        async getAllParentCategory(req,res){
            try{
                const allParents = await ParentCategorySchema.find({})
                if(allParents){
                    res.status(200).json({success : true, message: "Parent found", data: allParents}) 
                }
                else{
                    res.status(401).json({success : false, message: "Parent saved"})
                }
            }
            catch(err){
                res.status(404).json({success : false, message: "Parent saved"})

            }
        }
    }
}

module.exports = adminControllers