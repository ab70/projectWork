const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    parentId: {type: mongoose.Schema.Types.ObjectId, ref:'Parentcategory', required: true},
    categoryName: { type: String, required:true, trim: true},
    categoryOrder:{type:Number, required :true },
    buttons:[{type: mongoose.Schema.Types.ObjectId, ref:'Button',}],
    categoryImg:{type: String, },
    categoryImgPath : {type: String ,trim: true}

},{timestamps: true})

module.exports = mongoose.model("Category",CategorySchema)

