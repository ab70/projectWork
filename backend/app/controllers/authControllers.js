const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const UserSchema = require('../models/User')

function authControllers(){
    return {
        //register user
        async registerUser(req,res){
            try{
                //await UserSchema.deleteMany()
                
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

                    if((newUser.email=='' && newUser.phone=="")){
                        res.status(401).json({message: "Must provide email or password"})
                    }
                    else{
                    const saveNewUser = await newUser.save()
                    if(saveNewUser){
                        res.status(200).json({message: "Registration Successful !"})
                    }
                    else{
                        res.status(403).json({message: "Can't Register. Please try again."})
                    } 
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
                console.log(findUser);
                if(!findUser){
                    res.status(401).json({message: "User Doesn't exist. Please sign up"})
                }
                else{
                   const hasedPass = CryptoJs.AES.decrypt(findUser.password, process.env.SECRET_key).toString(CryptoJs.enc.Utf8);
                   if(hasedPass!==req.body.password){
                    console.log('hased pass didnt');
                    res.status(403).json({message: "Please check email and password again."})
                   }
                   else{
                    const token = jwt.sign({id: findUser._id, role: findUser.isAdmin},process.env.jsonSec)
                    console.log(token);
                    const {password,createdAt,updatedAt, ...others} = findUser._doc;
                    req.session.currentUser = others
                    res.cookie('jwt_token', token,{ expires: new Date((new Date()).getTime() + (10 * 86400000)), httpOnly: true } )
                    res.status(200).json({message: "user logged in Successfully", data: others})
                   }
                }
            }
            catch(err){
                res.status(404).json({message: "There was an error while login."})
            }
        }
    }
}

module.exports = authControllers