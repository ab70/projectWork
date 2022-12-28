const mongoose = require('mongoose')

const SubcategorySchema = mongoose.Schema({
    categoryId:{type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    subCategoryName:{type: String, trim: true,required: true},
    freePost : {type: Number, required: true, },
    ordering: {type: Number, required: true},
    status: {type: String,enum:['active','inactive'], default: 'active'},
    features: [{type: mongoose.Schema.Types.ObjectId, ref:'Feature'}]
    
})

module.exports = mongoose.model("Subcategory", SubcategorySchema)

