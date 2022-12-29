const mongoose = require('mongoose')


const FeatureSchema = new mongoose.Schema({
    
    featureName: { type: String, requred: true, trim: true},
    featureType: {type: String, requred: true, trim: true },
    featureOrdering:{type:Number, default:0},
    status:{type:String, enum:['active','inactive'], default:'active'},
    options: [{optionName: {}}]

},{timestamps: true})

module.exports = mongoose.model("Feature",FeatureSchema)

