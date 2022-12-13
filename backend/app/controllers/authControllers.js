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
                        res.status(401).json({ success: false, message: "Must provide email or password"})
                    }
                    else{
                    const saveNewUser = await newUser.save()
                    if(saveNewUser){
                        res.status(200).json({success: true,message: "Registration Successful !"})
                    }
                    else{
                        res.status(403).json({success: false,message: "Can't Register. Please try again."})
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
                    res.status(401).json({success: false, message: "User Doesn't exist. Please sign up"})
                }
                else{
                   const hasedPass = CryptoJs.AES.decrypt(findUser.password, process.env.SECRET_key).toString(CryptoJs.enc.Utf8);
                   if(hasedPass!==req.body.password){
                    
                    res.status(403).json({success: false,message: "Please check email and password again."})
                   }
                   else{
                    const token = jwt.sign({id: findUser._id, role: findUser.isAdmin},process.env.jsonSec)
                    console.log(token);
                    const {password,createdAt,updatedAt, ...others} = findUser._doc;
                    //req.session.currentUser = others
                    
                    res.cookie('jwt_token', token ,{ expires: new Date((new Date()).getTime() + (10 * 86400000)),sameSite: "none", httpOnly: true, secure: true } )
                    
                    res.status(200).json({success: true,message:"User logedin", data: others});
                   }
                }
            }
            catch(err){
                res.status(404).json({success: false,message: "There was an error while login."})
            }
        },
        //cookie test 
        cookieTest(req,res){
            const token = req.cookies.jwt_token;
            if(token){
                res.status(201).json({message: token})
                // jwt.verify(token, process.env.jsonSec, async(err,decodedToken)=>{
                //     if(err){
                //         res.ststus(403).json({message: "Token is invalid!"})
                //     }
                //     else{
                //         res.status(200).json({message: decodedToken})
                //     }
                // })
            }
            else{
                res.status(400).json({message: "Ok Token not found"})
            }
        }
    }
}

module.exports = authControllers