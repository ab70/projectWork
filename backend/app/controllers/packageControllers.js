const {Packageschema,Vatschema,Bonusschema} = require('../models/Package')
const Sortschema = require('../models/Sorting')

function packageControllers(){
    return{
        //Add sorting
        async addSorting(req,res){
            try{
                const bodyData = new Sortschema(req.body)
                const savedata = await bodyData.save()
                savedata ? res.status(200).json({success:true, message:"data saved"})
                :
                res.status(401).json({success:false, message:"Can't save"})
            }
            catch(err){
                res.status(500).json({success:false, message: err.message})
            }

        },
        //get all sort
        async getAllSort(req,res){
            try{
                const getAllData = await Sortschema.find({})
                getAllData ? res.status(200).json({success:true, message:"Sort found", data:getAllData})
                :
                res.status(401).json({success:false, message:"can't find"})
            }
            catch(err){
                res.status(500).json({success:false, message:"can't find"})
            }
        },
        //Edit sort
        async editSort(req,res){
            try {
                let id = req.body._id
                editbody = req.body
                delete editbody._id
                const editedData = await Sortschema.findOneAndUpdate({"_id": id }, editbody)
                editedData ? res.status(200).json({ success: true, message: "Data updated"})
                :
                res.status(401).json({success: false, message: "Data update failed"})
            }
            catch (err) {
                res.status(404).json({success: false, message: err.message})
            }
        },
        async deleteSort(req,res){
            try {
                const deleteData = await Sortschema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                :
                res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        },
        //Add new package
        async addNewPackage(req,res){
            try{
                const reqbody = new Packageschema(req.body)
                const saveData = await reqbody.save()
                saveData ? res.status(200).json({success: true, message:"Saved"})
                :
                res.status(401).json({success: false, message:"Can't Save"})
                
            }
            catch(err){
                res.status(404).json({success: false, message:err})
            }
        },

        //get all packages
        async getAllPackages(req,res){
            try{
                const datas = await Packageschema.find({}).sort({packageOrder:-1})
                datas ? res.status(200).json({success: true, message: false, data: datas})
                :
                res.status(401).json({success: false, message: "", data: datas})
            }
            catch(err){
                res.status(404).json({success: false, message: "", data: datas})
            }
        },
        //get all bundle,single, coupones, sorts
        async getDatatables(req,res){
            try{
                //get bundle
                const bundle = await Packageschema.find({packageType:"bundle"})
                //get single
                const single = await Packageschema.find({packageType:"single"})
                //get sort
                const sort = await Packageschema.find({packageType:"sort"})
                //get coupone
                const coupone = await Bonusschema.find({})

                //vat data
                const vat = await Vatschema.find({})

                let allData = {
                    Bundle: bundle,
                    Single: single,
                    Sort: sort,
                    Coupone: coupone,
                    Vat: vat
                }
                res.status(200).json({success:true,message:"Data fetch done",data:allData})
            }
            catch(err){
                res.status(500).json({success:false,message:"Data fetch done",data:allData})
            }
        },
        //get a package info
        async getPackageInfo(req,res){
            try {
                const getData = await Packageschema.find({ _id: req.params.id })
                getData ? res.status(200).json({ success: true, message: "product Found", data: getData })
                    :
                    res.status(401).json({ success: false, message: "product couldn't Found" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "product couldn't Found" })
            }
        },

        //edit packages
        async editPackage(req,res){
            try {
                let id = req.body._id
                editbody = req.body
                delete editbody._id
                const editedData = await Packageschema.findOneAndUpdate({ "_id": id }, editbody)
                editedData ? res.status(200).json({ success: true, message: "Data updated" })
                :
                res.status(401).json({ success: false, message: "Data update failed" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },
        //delete package
        async deletepackage(req,res){
            try {
                const deleteData = await Packageschema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                :
                res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        },
        //get all vat
        async getAllVat(req,res){
            try {
                const allData = await Vatschema.find({})
                allData ? res.status(200).json({ success: true, message:"Data found", data:allData})
                :
                res.save({ success: false, message: "Data can't found"})   
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message})
            }
        },
        //  Add or edit vat
        async VatController(req,res){
            try{
                const lengthFind = await Vatschema.find({})
                if(lengthFind.length>0){
                    let id = lengthFind[0]._id;
                    const updateData = await Vatschema.findOneAndUpdate({"_id":id},req.body)
                    updateData ? res.status(200).json({success:true, message:"Updated Done"})
                    :
                    res.status(401).json({success:false, message:"Can't Update"})
                }
                else{
                const vats = await Vatschema.save(req.body);
                vats ? res.status(200).json({success:false, message:"Updated"})
                :
                res.status(401).json({success:false, message:"Can't Update"})
                }
            }
            catch(err){
                res.status(500).json({success:false, message:"Can't Update"})
            }
        },
        //get all bonus and coupones
        async getAllCoupons(req,res){
            try{
                const getData = await Bonusschema.find({})
                getData ? res.status(200).json({success:true, message:"Data Found", data: getData}) 
                : 
                res.status(401).json({success:false, message:"Can't Get"})
            }   
            catch(err){
                res.status(500).json({success:false, message:err.message})
            }
        },
        //add bonus or coupon
        async bonusCoupone(req,res) {
            try {
                const bodyTosave = new Bonusschema(req.body)
                const saveData = await bodyTosave.save();
                saveData ? res.status(200).json({success:true, message:"Data saved"}) 
                : 
                res.status(401).json({success:false, message: "can't save"})
            }
            catch(err){
                res.status(505).json({success:false, message: err.message})
            }
        },
        //Edit bonus or coupon
        async editBonusCoupone(req,res){
            try {
                let id = req.body._id
                editbody = req.body
                delete editbody._id
                const editedData = await Bonusschema.findOneAndUpdate({ "_id": id }, editbody)
                editedData ? res.status(200).json({ success: true, message: "Data updated"})
                :
                res.status(401).json({success: false, message: "Data update failed"})
            }
            catch (err) {
                res.status(404).json({success: false, message: err.message})
            }
        },
        //delete coupons
        async deleteCoupons(req,res){
            try {
                const deleteData = await Bonusschema.findByIdAndDelete({ _id: req.params.id })
                deleteData ? res.status(200).json({ success: true, message: "Data deleted" })
                :
                res.status(401).json({ success: false, message: "Data can't delete" })
            }
            catch (err) {
                res.status(404).json({ success: false, message: "Data can't delete" })
            }
        }
        
    }
}

module.exports = packageControllers