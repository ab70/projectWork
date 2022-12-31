const ProductSchema = require('../models/Product')
const ButtonSchema = require('../models/Buttons')
const UserSchema = require('../models/User')
const LocationSchema = require('../models/Location')
const CategorySchema = require('../models/Category')
const SubLocationSchem = require('../models/SubLocation')
const ParentCategory = require('../models/ParentCategory')
const SubcategorySchema = require('../models/Subcategory')

function productControllers() {
    return {
        //Add new product 
        async addNewProduct(req, res) {
            try {
                // await ProductSchema.deleteMany()
                console.log(req.body);
                if (!req.files) {
                    console.log("Files not found");
                }
                else {
                    console.log("Files found");
                }
                let databody = new ProductSchema(req.body)
                databody.userId = '6398732316bd7468e63fa39a'

                /* Finding the count of the documents in the collection and adding 1 to it. */
                let countObj = await ProductSchema.find().count() +1
                databody.productOrder = countObj

                let i = 0
                /* Pushing the filename of the image into the productImgs array. */
                req.files.forEach(e => {
                    databody.productImgs.push({ img: e.filename, longImg: req.body.productImg[i].longImg })
                });
                console.log(databody);
                const postproduct = await databody.save()
                if (postproduct) {
                    res.status(200).json({ success: true, message: "Product Saved", data: databody })
                }
                else {
                    res.status(401).json({ success: false, message: "Product couldn't save", })
                }

            }
            catch (err) {
                console.log(err);
                res.status(404).json({ success: false, message: err, })
            }
        },
        //get all product
        async getAllProduct(req, res) {
            try {
                const prodData = await ProductSchema.find({}).populate('sublocation subcategoryId features.feature').sort({productOrder:-1})
                if (prodData) {
                    res.status(200).json({ success: true, message: "Product fetched", data: prodData })
                }
                else {
                    res.status(401).json({ success: false, message: "Product couldn't fetch", })
                }
            }
            catch (err) {
                res.status(200).json({ success: false, message: err, })
            }
        },
        //get a product info
        async getAProduct(req, res) {
            try {
                const getData = await ProductSchema.find({ _id: req.params.id }).populate('categoryId location features.feature')
                getData ? res.status(200).json({ success: true, message: "product Found", data: getData })
                    :
                    res.status(401).json({ success: false, message: "product couldn't Found" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "product couldn't Found" })
            }
        }
        ,
        //get userId for product
        async getAlUser(req, res) {
            try {
                const findUser = await UserSchema.findOne({ $or: [{ email: req.params.emailphone }, { phone: req.params.emailphone }] }, { "name": 1 })
                findUser ? res.status(200).json({ success: true, message: "found user", data: findUser })
                    :
                    res.status(401).json({ success: false, message: "user not found" })

            }
            catch (err) {
                res.status(404).json({ success: false, message: "user not found" })
            }
        },
        //approve picture of product img
        async productImgApprove(req, res) {
            try {
                
                let findObj = await ProductSchema.update({ "productImgs._id": id }, { "$set": { "productImgs.$.approved": req.body.approved } })
                let changed = 'no'
                let id = findObj._id
                findObj.productImgs.every(e=>{
                    if(e.approved==='false'){
                        changed = 'yes'
                        return false
                    }
                    return true
                })
                if(changed==='no'){
                    await ProductSchema.findByIdAndUpdate({_id:id},{$set: { imageChanged: changed }}, {upsert: true})
                }
                findObj ? res.status(200).json({ success: true, message: "found", data: findObj })
                :
                res.status(401).json({ success: false, message: "not found" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "found" })
            }
        },
        //delete a photo
        async deletePhoto(req, res) {
            try {
                let deleteimg = await ProductSchema.findByIdAndUpdate({ _id: req.body.productId }, { $pull: { productImgs: { _id: req.body.imgId } } }, { safe: true, multi: false })
                deleteimg ? res.status(200).json({ success: true, message: "Deleted image" })
                    :
                    res.status(401).json({ success: false, message: "Couldn't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Server couldn't remove" })
            }
        },
        //Edit product
        async editproduct(req, res) {
            try {
                if (!req.files) {
                    let id = req.body._id
                    let databody = req.body
                    delete databody._id
                    console.log(databody);
                    if((databody.editDescription!=="") && (databody.acceptDescription==='accept')){
                        databody.description = databody.editDescription
                    }
                    let editedData = await ProductSchema.findOneAndUpdate({ "_id": id }, databody)
                    editedData ? res.status(200).json({ success: true, message: "Edited done data" })
                    :
                    res.status(401).json({ success: false, message: "Edited not successful." })
                }
                else {
                    let id = req.body._id
                    let databody = req.body
                    delete databody._id
                    console.log(databody);
                    if((databody.editDescription!=="") && (databody.acceptDescription==='accept')){
                        databody.description = databody.editDescription
                    }
                    let i = 0
                    req.files.forEach(e => {
                        databody.productImgs.push({ img: e.filename, longImg: req.body.productImg[i].longImg })
                    });
                    let editedData = await ProductSchema.findOneAndUpdate({ "_id": id }, databody)
                    editedData ? res.status(200).json({ success: true, message: "Data updated with image" })
                    :
                    res.status(401).json({ success: false, message: "Data update failed" })
                }
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ success: false, message: err })
            }
        },
        //delete a product
        async deleteProduct(req,res){
            try {
                const deleteData = await ProductSchema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                :
                res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        },

        //add location
        async addLocation(req, res) {
            try {

                const location = new LocationSchema(req.body)
                const saveLocation = await location.save()
                saveLocation ? res.status(200).json({ success: true, message: "saved" })
                    :
                    res.status(401).json({ success: false, message: "Can't save" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },
        //edit location
        async editLocation(req, res) {
            try {
                let id = req.body._id
                editbody = req.body
                delete editbody._id
                const editedData = await LocationSchema.findOneAndUpdate({ "_id": id }, editbody)
                editedData ? res.status(200).json({ success: true, message: "Data updated" })
                    :
                    res.status(401).json({ success: false, message: "Data update failed" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },
        //delete location
        async deleteLocation(req, res) {
            try {
                const deleteData = await LocationSchema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                    :
                    res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        },
        //get all location with sublocation
        async getAllLocationNsubLocation(req, res) {
            try {
                let alllocation = [{
                    location: {},
                    sublocations: [{}]
                }]
                let location = await LocationSchema.find({}).sort({ ordering: 'asc' })
                let sublocation = await SubLocationSchem.find({}).sort({ ordering: 'asc' })
                location.forEach(e => {
                    alllocation.push({ location: e, sublocations: [] })
                })
                alllocation.shift();
                for (let i = 0; i < sublocation.length; i++) {
                    for (let j = 0; j < alllocation.length; j++) {
                        if (alllocation[j].location._id.toString() === sublocation[i].locationId.toString()) {
                            console.log("yes");
                            console.log(alllocation[j]);
                            alllocation[j].sublocations.push(sublocation[i])
                        }
                    }
                }
                res.status(201).json({ success: true, message: "Found", data: alllocation })
            }
            catch (err) {
                res.status(404).json({ success: true, message: err })
            }
        },
        //get all locations
        async getAllLocations(req, res) {
            try {
                const getdata = await LocationSchema.find({})
                getdata ? res.status(200).json({ success: true, message: "Found", data: getdata })
                    :
                    res.status(401).json({ success: false, message: "Couldn't Found" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },
        //get a locations info
        async getAlocation(req, res) {
            try {
                const getdata = await LocationSchema.find({ _id: req.params.id })
                getdata ? res.status(200).json({ success: true, message: "Found", data: getdata })
                    :
                    res.status(401).json({ success: false, message: "Couldn't Found" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },

        //Post sub location
        async addSublocation(req, res) {
            try {
                console.log(req.body);
                const newSub = new SubLocationSchem({
                    locationId: req.body.locationId,
                    subLocationName: req.body.subLocationName,
                    link: req.body.link,
                    ordering: req.body.ordering,
                    status: req.body.status
                })

                const saveSub = await newSub.save()
                saveSub ? res.status(200).json({ success: true, message: "Sved" })
                    :
                    res.status(401).json({ success: false, message: "Could not Sved" })
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ success: false, message: err })
            }
        },
        //get all sub locations under a location
        async getAllSubLocationsunderLocation(req, res) {
            try {
                const getData = await SubLocationSchem.find({ locationId: req.params.id })
                getData ? res.status(200).json({ success: true, message: "data found", data: getData })
                    :
                    res.status(401).json({ success: false, message: "data not found" })

            }
            catch (err) {
                res.status(404).json({ success: false, message: "data not found" })
            }
        },
        //get a subllocation
        async getAsublocation(req, res) {
            try {
                const getdata = await SubLocationSchem.find({ _id: req.params.id })
                getdata ? res.status(200).json({ success: true, message: "Found", data: getdata })
                    :
                    res.status(401).json({ success: false, message: "Couldn't Found" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },
        //edit sublocation
        async editSublocation(req, res) {
            try {
                let id = req.body._id
                editbody = req.body
                delete editbody._id
                const editedData = await SubLocationSchem.findOneAndUpdate({ "_id": id }, editbody)
                editedData ? res.status(200).json({ success: true, message: "Data updated" })
                    :
                    res.status(401).json({ success: false, message: "Data update failed" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },
        //delete a sublocation
        async deleteSublocation(req, res) {
            try {
                const deleteData = await SubLocationSchem.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                    :
                    res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        },
        //add buttons
        async getButtons(req, res) {
            try {
                const saveButton = await ButtonSchema.find({}).sort({ buttonOrder: 'asc' })

                res.status(200).json({success:true, message:"found", data:saveButton})
            }
            catch (err) {
                res.status(404).json({success:false, message:"Cant' find data"})
            }
        },
        //get all cat sub cat with parent cat
        async parentCatSubcat(req,res){
            try{
                let allCombinedCat = [{
                    parent:{},
                    categories:[{
                        category:{},
                        subcategories:[]
                    }]

                }]
                let allParent = await ParentCategory.find({})
                let allCat = await CategorySchema.find({})
                let allsub = await SubcategorySchema.find({})
                allParent.forEach(e => {
                    allCombinedCat.push({ parent: e, categories: [{category:{},subcategories:[]}] })
                })
                allCombinedCat.shift();
                
                for (let i = 0; i < allCat.length; i++) {
                    for (let j = 0; j < allCombinedCat.length; j++) {
                        if (allCombinedCat[j].parent._id.toString() === allCat[i].parentId.toString()) {
                            console.log("yes");
                            allCombinedCat[j].categories.push({category:allCat[i],subcategories:[]})
                        }
                    }
                }
                allCombinedCat.forEach(e=>{
                    e.categories.shift();
                })
                
                allCombinedCat.forEach(e => {
                        
                        e.categories.forEach(ej =>{
                            for (let i = 0; i < allsub.length; i++){
                                if(ej.category._id.toString() === allsub[i].categoryId.toString()){ 
                                    ej.subcategories.push(allsub[i])
                                }
                            }                        
              
                        })

                });
                
            console.log(allCombinedCat);
                
                res.status(200).json({success:true, message: "Fetch done", data: allCombinedCat})
            }
            catch(err){

            }
        }
    }
}




module.exports = productControllers