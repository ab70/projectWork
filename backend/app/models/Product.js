const mongoose = require('mongoose')
const moment = require('moment')

const ProductSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    heading: { type: String, required: true, trim: true},
    description: { type: String, trim: true },
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    location:{type: mongoose.Schema.Types.ObjectId, ref:'Location', required: true},
    address: { type: String, trim: true,  default: '' },
    productStatus: { type: String, default: '' },
    slotStatus: {type:String,trim:true, default:''},
    notificationDialogue: {type:String, trim: true, default:''},
    productImg :[ {img: {type: String, trim:true}, longImg:{type: String, trim:true, default: 'false' }}],
    quantity: {type: Number, default: 0, },
    payablePrice: {type: Number, default: 0},
    oldPrice:{ type: Number, default:0 },
    homeDelivery: {type: String, default: ''},
    homeDeliveryPrice: {type: Number, default:0 },
    total: {
        impression: {type: Number, default:0 },
        reach: {type:Number, default: 0,},
        click: {type:Number, default:0},
    },
    normal: {
        impression: {type: Number, default:0 },
        reach: {type:Number, default: 0,},
        click: {type:Number, default:0},
    },
    paid:{
        impression: {type: Number, default:0 },
        reach: {type:Number, default: 0,},
        click: {type:Number, default:0},
    },
    videoLink: { type: String, trim:true, default:''},
    publishedAt:{type: Date, default: '' },
    features:[
        {
            feature:{type: mongoose.Schema.Types.ObjectId, ref:'Feature', required: true},
            selectedOption:{
                value: [{type: String, default:'', trim: true}]
            } 
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema)