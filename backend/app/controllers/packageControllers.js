const {Packageschema} = require('../models/Package')

function packageControllers(){
    return{
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
        //
    }
}

module.exports = packageControllers