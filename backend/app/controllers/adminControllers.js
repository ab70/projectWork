const ParentCategorySchema = require('../models/ParentCategory')
const CategorySchema = require('../models/Category')
const SubcategorySchema = require('../models/Subcategory')
const FeatureSchema = require('../models/Feature')
const UserSchema = require('../models/User')
const LocationSchema  = require('../models/Location')


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
        async location(req,res){
            try{
                const saved = await LocationSchema.find({})
                saved ? res.status(200).json({succeess: true, message: "Locations found", data: saved})
                : res.status(401).json({succeess: false, message: "Locations could not found"})
            }
            catch(err){
              res.status(404).json({succeess: false, message: err})
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
        //getLoggedIn users info
        async getLoggedInUser(req,res){
            try{
                const id = req.userid
                console.log(id);
                const userInfo = await UserSchema.findById({_id: id},{"password":0})
                console.log(userInfo);
                if(userInfo){
                    res.status(200).json({success: true, message: "Users Data found", data: userInfo})
                }
                else{
                    res.status(401).json({success: false, message: "Users not  found"})
                }
            }
            catch(err){
                res.status(404).json({success: false, message: "Users not  found"})
            }
        },
        //get a userinfo by click
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
                let id = req.body.id
                let bodyData = req.body //here to set new object that will be placed in db obj
                delete bodyData.id

                const editedData = await FeatureSchema.findOneAndUpdate({"_id": id}, bodyData)
                    if(!editedData){
                        res.status(401).json({success: false, message: "Can't Edit feature" })
                    }
                    else{
                        res.status(200).json({success: true, message: "Edit feature Done"})
                    }
   
            }
            catch(err){
                res.status(404).json({success: false, message: err, })
            }
           
        },
        //ADD NEW CATEGORY
        async addCategory(req,res){
            try{
                console.log(req.body);
                console.log(req.file.filename);
                const checkCategory = await CategorySchema.find({$and:[{parentId:req.body.parentId},{categoryName: req.body.categoryName}]})
                if(checkCategory.length>0){
                    res.status(401).json({success: false, message: "Category under a parent cant be twice"})
                }
                else{
                    const newCat = new CategorySchema({
                        parentId: req.body.parentId,
                        categoryName: req.body.categoryName,
                        categoryOrder: req.body.categoryOrder,
                        buttons:req.body.buttons,
                        categoryImg: req.file.filename,
                        categoryImgPath: req.file.path 
                    })
                    
    
                    // res.status(200).json({success: true, message: "Category added", data : newCat})
                    const saveCat = await newCat.save()
                    if(saveCat){
                        
                        res.status(200).json({success: true, message: "Category added", })
                    }
                    else{
                        res.status(401).json({success: false, message: "Couldn't add category"})
                    } 
                    
                }
               
            }
            catch(err){
                console.log(err);
                res.status(404).json({success: false, message: err})
            }
        },
        //get all category
        async getAllCategory(req,res){
            try{
                const getdata = await CategorySchema.find({}).populate('buttons')
                if(getdata){res.status(200).json({success: true,message: "Category fetch done", data: getdata})}
                else{res.status(401).json({success: false,message: "Category fetch done", data: getdata})}
            }
            catch(err){
                res.status(404).json({success: false,message: "Category fetch done", data: getdata})
            }
        },
        //delete category
        async deleteCategory(req,res){
            
            try {
                const deleteData = await CategorySchema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                    :
                res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }



        },
        //edit category
        async editCategory(req,res){
            try{
                const id = req.body.id
                let editBody = req.body

                delete editBody.id
                if(req.file){

                    editBody.categoryImg = req.file.filename
                    editBody.categoryImgPath = req.file.path
                    
                    let editedCat = await CategorySchema.findOneAndUpdate({"_id": id}, editBody)
                    if(editedCat){
                        res.status(200).json({ succeess: true, message: "Category edit successful"})
                    }
                    else{
                        res.status(401).json({ succeess: false, message: "Category edit failed"})
                    }
                
                }
                else{
                    let editedCat = await CategorySchema.findOneAndUpdate({"_id": id}, editBody)
                    if(editedCat){
                        res.status(200).json({ succeess: true, message: "Category edit successful"})
                    }
                    else{
                        res.status(401).json({ succeess: false, message: "Category edit failed"})
                    }
                
                }
                
                
            }
            catch(errr){
                console.log(errr);
                res.status(404).json({ succeess: false, message: errr})

            }
        },
        //add subcategory with feature
        async addSubcategory(req,res){
            try{
                //await SubcategorySchema.deleteMany()
                const newSubcat = new SubcategorySchema(req.body)
                const saveSubcat = await newSubcat.save()
                if(saveSubcat){
                    res.status(200).json({success: true, message: "Saved sub category with feature"})
                }
                else{
                    res.status(404).json({success: false, message: "Saved sub category with feature"})
                }
            }
            catch(err){
                res.status(404).json({success: false, message: err})
            }
        },
        //edit subcategory with feature
        async editSubCatwithFeature(req,res){
            try{
                let id = req.body.id
                let bodyData = req.body //here to set new object that will be placed in db obj
                delete bodyData.id

                const editedData = await SubcategorySchema.findOneAndUpdate({"_id": id}, bodyData)
                    if(!editedData){
                        res.status(401).json({success: false, message: "Can't Edit feature" })
                    }
                    else{
                        res.status(200).json({success: true, message: "Edit feature Done"})
                    }
            }
            catch(err){
                res.status(404).json({success: false, message: "Can't Edit feature" })
            }
        },
        //get all sub categories
        async getAllSubCategories(req,res){
            try{
                const result = await SubcategorySchema.find({}).populate('categoryId')
                if(result){
                    res.status(200).json({success: true, message: "Fetch done", data: result})
                }
                else{
                    res.status(401).json({success: false, message: "Failed to Fetch", data: result})
                }
            }
            catch(err){
                res.status(404).json({success: false, message: "Failed to Fetch", data: result})
            }
        },
        //get all category and its all sub category
        async getAllCatNsubCat(req,res){
            try {
                let allcategory = [{
                    category: {},
                    subCategory: [{}]
                }]
                let categori = await CategorySchema.find({}).sort({ categoryOrder: 'asc' })
                let subcategory = await SubcategorySchema.find({}).sort({ ordering: 'asc' })
                categori.forEach(e => {
                    allcategory.push({ category: e, subCategory: [] })
                })
                allcategory.shift();
                for (let i = 0; i < subcategory.length; i++) {
                    for (let j = 0; j < allcategory.length; j++) {
                        if (allcategory[j].category._id.toString() === subcategory[i].categoryId.toString()) {
                            
                            allcategory[j].subCategory.push(subcategory[i])
                        }
                    }
                }
                res.status(201).json({ success: true, message: "Found", data: allcategory })
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ success: false, message: err })
            }
        },
        //delete sub category
        async deleteSubCategory(req,res){
            try {
                const deleteData = await SubcategorySchema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                    :
                res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        },
        
        //GET category of a parent
        async getCategoryOfParent(req,res){
            try{
                const allCat = await CategorySchema.find({"parentId":req.params.id})
                res.status(200).json({succeess: true, message: "Data fetch done", data: allCat})
            }
            catch(err){
                res.status(404).json({succeess: false, message: "Data fetch done",})
            }
        },
        //get all subcategory under a category
        async getSubcategoryOfCategory(req,res){
            try{
                const allSub = await SubcategorySchema.find({categoryId: req.params.id}).populate('features')
                if(allSub){res.status(200).json({succeess: true, message: "Data fetch done",data: allSub})}
                else{res.status(401).json({succeess: false, message: "Data fetch fail"})}
            }
            catch(err){
                res.status(404).json({succeess: false, message: "Data fetch fail"})
            }
        },
        //get all feature of a sub category
        async getFeatureOfSubcategory(req,res){
            try{
            const features = await SubcategorySchema.find({"_id": req.params.id}).populate('features')
            features ? res.status(200).json({success:true, message:" Feature of this sub cat found", data: features}) : res.status(200).json({success:false, message:" Feature of this sub cat found"})
            }
            catch(err){
                res.status(404).json({success:false, message:" Feature of this sub cat found",})
            }
        }
        
        

    }
}

module.exports = adminControllers