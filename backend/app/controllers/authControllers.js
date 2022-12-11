
const UserSchema = require('../models/User')

function authControllers(){
    return {
        //register user
        async registerUser(req,res){
            console.log(req.body);
            const newUser = new UserSchema(req.body)
            console.log(newUser);
            // try{
            //     //find if user exist or not
            //     const findUser = await UserSchema.find({$or: [
            //         {
            //           email: req.body.email
            //         },
            //         {
            //           phone: req.body.phone
            //         }
            //       ]})
            //       if(!findUser){
            //         res.status(403).json({message: "User Already Exist!"})
            //       }
            //       else{
            //         const saveNewUser = await newUser 

            //       }
            //     // res.status(201).json({message: "got data"})
                
                
            // }
            // catch(err){

            // }

        },

        //login use
        async loginUser(req,res){
            
            try{
                const findUser = await UserSchema.findOne({$or: [{email: req.body.emailpass},{phone: req.body.emailpass}]})
                if(!findUser){
                    res.status(401).json({message: "User Doesn't exist. Please sign up"})
                }
            }
            catch(err){

            }
        }
    }
}

module.exports = authControllers