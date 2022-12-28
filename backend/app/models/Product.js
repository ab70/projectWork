const mongoose = require('mongoose')
const moment = require('moment')

const ProductSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    heading: { type: String, required: true, trim: true},
    description: { type: String, trim: true },
    editDescription:{type: String, trim:true},
    acceptDescription:{type:String, enum:['accept','reject'], default:'reject'},
    subcategoryId: {type: mongoose.Schema.Types.ObjectId, ref:'Subcategory', required: true},
    sublocation:{type: mongoose.Schema.Types.ObjectId, ref:'Sublocation', required: true},
    productStatus: { type: String, enum:['active','inactive','pause','review','delete','atvMsg','unatvMsg'], default: 'review' },
    slotStatus: {type:String,trim:true, enum:['ok','fail'], default:'ok'},
    showTill: {type: Date, default: moment().add(60, 'days').format('LL')},
    notificationDialogue: {type:String, trim: true, default:''},
    productImgs :[ {img: {type: String, trim:true}, approved:{type: String, trim:true,default:'false'}, longImg:{type: String, trim:true, default: 'false' }}],
    quantity: {type: Number, default: 0, },
    payablePrice: {type: Number, default: 0},
    oldPrice:{ type: Number, default:0 },
    homeDelivery: {type: String, default: ''},
    homeDeliveryPrice: {type: Number, default:0 },
    packageId:{type: mongoose.Schema.Types.ObjectId, ref:'Package', default:''},
    boosted:{type:Boolean, default:false},
    publishedAt:{type: Date, default: '' },
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
    features:[ 
        {
            feature:{type: mongoose.Schema.Types.ObjectId, ref:'Feature', required: true},
            selectedOption:[{type: String, default:'', trim: true
            }] 
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema)