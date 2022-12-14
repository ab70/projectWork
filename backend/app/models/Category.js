const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    parentId: {type: mongoose.Schema.Types.ObjectId, ref:'Parentcategory'},
    categoryName: { type: String, required: true, trim: true},
    subCat: [{subCatName: {type: String, trim: true}}],
    features: [{type: mongoose.Schema.Types.ObjectId, ref:'Feature'}]

},{timestamps: true})

module.exports = mongoose.model("Category",CategorySchema)

