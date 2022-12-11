
const UserSchema = require('../models/User')

function authControllers(){
    return {
        //register user
        async registerUser(req,res){
            console.log(req.body);
            const newUser = new UserSchema(req.body)
            console.log(newUser);
            try{
                //find if user exist or not
                const findUser = await UserSchema.find({$or: [
                    {
                      email: req.body.email
                    },
                    {
                      phone: req.body.phone
                    }
                  ]})
                  if(!findUser){
                    res.status(403).json({message: "User Already Exist!"})
                  }
                  else{
                    const saveNewUser = await newUser.save()
                    if(saveNewUser){
                        res.status(200).json({message: "Registered Successful!"})
                    }
                    else{
                        res.status(403).json({message: "Can't Register. Please try again."})
                    } 
                  }
            }
            catch(err){
                res.status(404).json({message: "Please Try again Server Error"})

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