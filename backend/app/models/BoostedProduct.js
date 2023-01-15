const mongoose = require('mongoose')

const BoostedProduct = new mongoose.Schema({
    productId:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    packageId:[{type: mongoose.Schema.Types.ObjectId, ref:'Package'}],
    price:{type: Number, default:0},
    paid:{type:Boolean, default:false},
    boosted:{type:Boolean, default:true},
    validTill:{type:Date,}
},{timestamps:true})

module.exports = mongoose.model("Boostedproduct",BoostedProduct)

