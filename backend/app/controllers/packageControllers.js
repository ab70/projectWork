const PackageSchema = require('../models/Package')

function packageControllers(){
    return{
        //insert package
        async(req,res){
            try{
                const reqbody = new PackageSchema(req.body)
            }
            catch(err){

            }
        }
    }
}