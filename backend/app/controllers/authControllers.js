const CryptoJs = require('crypto-js')
const UserSchema = require('../models/User')

function authControllers(){
    return {
        //register user
        async registerUser(req,res){
            try{
                
                //find if user exist or not
                const findUser = await UserSchema.findOne({$or: [
                    {
                      email: req.body.email
                    },
                    {
                      phone: req.body.phone
                    }
                  ]})
                  if(findUser){
                    res.status(403).json({message: "User Already Exist!"})
                  }
                  else{
                    let newUser = new UserSchema(req.body)
                    const pass = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_key)
                    newUser.password = pass
                    const saveNewUser = await newUser.save()
                    if(saveNewUser){
                        res.status(200).json({message: "Registration Successful !"})
                    }
                    else{
                        res.status(403).json({message: "Can't Register. Please try again."})
                    } 
                  }
            }
            catch(err){
                console.log(err);
                res.status(404).json({message: "User Already Exist! Try to login again"})

            }

        },

        //login use
        async loginUser(req,res){
            
            try{
                const findUser = await UserSchema.findOne({$or: [{email: req.body.emailphone},{phone: req.body.emailphone}]})
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