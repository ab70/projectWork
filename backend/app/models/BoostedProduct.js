const mongoose = require('mongoose')

const BoostedProduct = new mongoose.Schema({
    productId:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    boosted:{type:Boolean, default:true},
    
})