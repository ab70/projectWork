const mongoose = require('mongoose')


const ParentCategorySchema = new mongoose.Schema({
    name: {type:String, requred: true,trim: true},

},{timestamps: true})

module.exports = mongoose.model("Parentcategory", ParentCategorySchema)