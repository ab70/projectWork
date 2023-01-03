const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    details:{type:String,trim:true},
    metaKeywords:{type:String,trim:true},
    tag:{type:String,trim:true},
    images:[{type:String,trim:true}],
    ordering:{type:Number},
    status:[{type:String,enum:['enable','disable','show only details'],trim:true}],
    shareTimes:{type:Number,default:0},
    hits:{type:Number,default:0},
},{timestamps:true})

module.exports = mongoose.model('Blog',BlogSchema)