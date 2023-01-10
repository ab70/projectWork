const mongoose = require('mongoose')

const BonusSchema = new mongoose.Schema({
    totalPost:{type:Number, default:0},
    inTime:{type:Number, default:0},
    discAmount:{type:Number, default:0},
    validDays:{type:Number,default:0},
    status:{type:Boolean, default:true},
    couponCode:{type:String, default:''}
},{timestamps:true})

const VatSchema = new mongoose.Schema({
    addVat: {type:Number,default:0, min:0, max:100},
    status:{type:String, enum:['active','inactive'] , default:'inactive'}
},{timestamps:true})

const PackageSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    packageType:{type:String, enum:['single','sort', 'bundle'], default:'bundle'},
    packageStatus:{type: String, enum:['active','inactive'], default:'active'},
    bundle:{
        oldPrice: {type: Number, default:0},
        price: {type:Number,required:true, default:0},
        validDays:{type: Number, default:0, required:true},
        postAccess:[{
            parentId:{type: mongoose.Schema.Types.ObjectId, ref:'Parentcategory'},
            noOfPost:{type:Number}
        }],
        post:[{
            subcategories:[ {type: mongoose.Schema.Types.ObjectId, ref:'Subcategory',}
           ],
            reach: {type:Number, },
            click:{type: Number,},
        }],
        
        stickersSort:[{
            subcategories:[{type: mongoose.Schema.Types.ObjectId, ref:'Subcategory',}
            ],
            sorts:[{
                sortId: {type: mongoose.Schema.Types.ObjectId, ref:'Sort',},
                access: {type:Number}
            }]
        }],
        packageFeature:[{type:String, trim:true}],
        uncheckFeature:[{type:String, trim:true}],
        bestSuggestion: {type:String, trim:true},
        note:{type:String, trim:true}
    },
    single:{
        subcategories:[{type: mongoose.Schema.Types.ObjectId, ref:'Subcategory',}
        ],
        promote:{
            price:{type:Number},
            reach: {type:Number,},
            click:{type: Number,},
            minAmount: {type:Number,},
        },
        traffic:{
            price:{type:Number},
            reach:{type:Number},
            click:{type:Number},
            minAmount:{type:Number}
        } 
    },
    sort:{
        subcategories:[{type: mongoose.Schema.Types.ObjectId, ref:'Subcategory'}
        ],
        sortId:{type:mongoose.Schema.Types.ObjectId, ref:'Sort'},
        price:{type:Number},
    },
    packageOrder:{type: Number, default:0}
},{timestamps:true})


const Vatschema = mongoose.model("Vat",VatSchema)
const Packageschema  = mongoose.model("Package",PackageSchema)
const Bonusschema = mongoose.model('Bonus',BonusSchema)


module.exports = {Packageschema,Bonusschema,Vatschema}