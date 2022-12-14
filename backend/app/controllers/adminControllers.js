const ParentCategorySchema = require('../models/ParentCategory')
const FeatureSchema = require('../models/Feature')
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
        },
        //feature create
        async createFeature(req,res){
            try{
                const newFeature = new FeatureSchema(req.body)
                const saveFeature = await newFeature.save()
                if(saveFeature){
                    res.status(200).json({success: true, message: "Feature inserted", data: newFeature})
                }
                else{
                    res.status(401).json({success: false, message: "Feature name must be unique"})
                }
                
            }
            catch(err){
                res.status(404).json({success: false, message: "Error while creating feature"})
            }
        },
        //find all features
        async getAllFeatures(req,res){
            try{
                const findAll = await FeatureSchema.find({})
                if(findAll){
                    res.status(200).json({success: true, message: "Feature fetch successfull", data :findAll })
                }
                else{
                    res.status(401).json({success: false, message: "Feature could not fetch" })
                }

            }
            catch(err){
                res.status(404).json({success: false, message: "Feature could not fetch" })
            }
        },
        //edit feature
        async editFeature(req,res){
            try{
                const id = req.body.id
                let bodyData = req.body //here to set new object that will be placed in db obj
                delete bodyData.id
                console.log(bodyData);

                const editedData = await FeatureSchema.findOneAndUpdate({"_id": id}, bodyData, function(err,result){
                    if(err){
                        res.status(401).json({success: false, message: "Can't Edit feature" })
                    }
                    else{
                        res.status(200).json({success: true, message: " Edit feature Done"})
                    }
                  
                })

            }
            catch(err){
                res.status(404).json({success: true, message: "Failed to Edit feature", })
            }
           
        }

    }
}

module.exports = adminControllers