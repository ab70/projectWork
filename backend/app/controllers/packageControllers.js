const PackageSchema = require('../models/Package')

function packageControllers(){
    return{
        //Add new package
        async(req,res){
            try{
                const reqbody = new PackageSchema(req.body)
                
            }
            catch(err){

            }
        }
    }
}