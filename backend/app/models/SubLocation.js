const mongoose = require('mongoose')

const SubLocationSchem = new mongoose.Schema({
    locationId: {type: mongoose.Schema.Types.ObjectId, ref:'Location', required: true},
    subLocationName: {type: String, required:true, trim:true},
    link: {type:String, trim:true},
    ordering:{type:Number, default:0},
    status:{type:String, trim: true, default:"active"},
},
{timestamps:true})

module.exports = mongoose.model('Sublocation', SubLocationSchem)