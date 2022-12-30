const PackageSchema = require('../models/Package')

function packageControllers(){
    return{
        //Add new package
        async addNewPackage(req,res){
            try{
                const reqbody = new PackageSchema(req.body)
                const saveData = await reqbody.save()
                saveData ? res.status(200).json({success: true, message:"Saved"})
                :
                res.status(401).json({success: false, message:"Can't Save"})
                
            }
            catch(err){
                res.status(401).json({success: false, message:err})
            }
        }
    }
}

module.exports = packageControllers