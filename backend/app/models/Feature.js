const mongoose = require('mongoose')


const FeatureSchema = new mongoose.Schema({
    featureName: { type: String, requred: true, trim: true},
    featureType: {type: String, requred: true, trim: true },
    options: [{optionName: {type: String, required: true, trim: true}}]
},{timestamps: true})

module.exports = mongoose.model("Feature",FeatureSchema)

