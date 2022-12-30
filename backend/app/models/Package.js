const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    packageType:{type:String, enum:['single','sticker', 'bundle'], default:'bundle'},
    oldPrice: {type: Number, default:0},
    currentPrice: {type:Number,required:true, default:0},
    validDays:{type: Number, default:0, required:true},
    packageStatus:{type: Boolean, default: true},
    bundle:{
        postAccess:[{
            parentId:{type: mongoose.Schema.Types.ObjectId, ref:'Parentcategory'},
            noOfPost:{type:Number}
        }],
        post:[{
            categories:[{
                categoryId: [{type: mongoose.Schema.Types.ObjectId, ref:'Category',}]
            },
            ],
            reach: {type:Number, },
            click:{type: Number,},
        }],
        bidnOffer:[{
            categories:[{
                categoryId: [{type: mongoose.Schema.Types.ObjectId, ref:'Category',}]
            },
            ],
            reach: {type:Number,},
            click:{type: Number, },
        }],
        stickersSort:[{
            categories:[{
                categoryId: [{type: mongoose.Schema.Types.ObjectId, ref:'Category',}]
            },
            ],
            urgent: {type:Number, },
            cheap:{type: Number,},
        }],
    },
    single:[{
        categories:[{
            categoryId: [{type: mongoose.Schema.Types.ObjectId, ref:'Category',}]
        },
        ],
        reach: {type:Number,},
        click:{type: Number, },
    }],
    sticker:[{
        categories:[{
            categoryId: [{type: mongoose.Schema.Types.ObjectId, ref:'Category',}]
        },
        ],
        reach: {type:Number,},
        click:{type: Number, },
    }],
    
    packageFeature:[{name:{type:String, trim:true}}],
    packageOrder:{type: Number, default:0}
},{timestamps:true})

const Packageschema  = mongoose.model("Package",PackageSchema)

module.exports = {Packageschema}