const ParentCategorySchema = require('../models/ParentCategory')
const UserSchema = require('../models/User')

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
        //add parent category
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
        //get all parent category
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
        },
        //get all users
        async getAllUser(req,res){
            try{
                let alluser = await UserSchema.find({},{"password": 0, "marchantInfo": 0})
                if(alluser){

                    res.status(200).json({success: true, message: "All user fetch successful.", data: alluser})
                }
            }
            catch(err){
                res.status(404).json({success: false, message: "Error while fetching Users"})
            }
        },
        async getAusersData(req,res){
            try{
                const findUser = await UserSchema.findById({_id: req.params.id},{ "password": 0})
                if(findUser){
                    res.status(200).json({success: true, message: "Users Data found", data: findUser})
                }else{
                    res.status(404).json({success: false, message: "Error while fetching Users"})
                }
                
            }
            catch(err){
                res.status(404).json({success: false, message: "Error while fetching Users"})
            }
        }
    }
}

module.exports = adminControllers