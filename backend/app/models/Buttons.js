const mongoose = require('mongoose')


const ButtonSchema = new mongoose.Schema({
    buttonName:{type:String,unique:true, trim:true},
    buttonOrder:{type:Number,default:4}

},{timestamps: true})

module.exports = mongoose.model("Button",ButtonSchema)