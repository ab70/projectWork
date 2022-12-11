
const UserSchema = require('../models/User')

function authControllers(){
    return {
        //register user
        async registerUser(req,res){
            console.log(req.body);
            try{
                //find if user exist or not
                
                res.status(201).json({message: "got data"})
                
            }
            catch(err){

            }

        }
    }
}

module.exports = authControllers