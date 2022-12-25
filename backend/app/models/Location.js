const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({

    locationName: {type: String, trim:true},
    ordering:{type:Number,default:10},
    status:{type:String, default:"active"}

},{timestamps:true})

module.exports = mongoose.model('Location',LocationSchema )