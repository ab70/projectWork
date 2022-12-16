const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const auth = (req,res,next)=>{
    const token = req.cookies.jwt_token;
    console.log(token);
    if(token){
        jwt.verify(token, process.env.jsonSec,async (err,decodedToken)=>{
            if(err){
                req.id = null
                
                res.status(401).json({success: false, message: "You dont have authorization"})

            }
            else{
                req.userid = decodedToken.id
                next()
            }
        })
    }
    else{
        res.status(401).json({success: false, message: "You dont have authorization"})
    }
}

module.exports = {auth}