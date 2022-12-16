const mongoose = require('mongoose')

const SubcategorySchema = mongoose.Schema({
    parentId: {type: mongoose.Schema.Types.ObjectId, ref:'Parentcategory' ,required: true},
    categoryId:{type: mongoose.Schema.Types.ObjectId, ref:'Category', required: true},
    subCategory: [
        {   
            freePost : {type: Number, required: true, },
            subCategoryName:{type: String, trim: true,required: true},
            features: [{type: mongoose.Schema.Types.ObjectId, ref:'Feature'}]
        }
    ]
})

module.exports = mongoose.model("Subcategory", SubcategorySchema)

// {
//     "parentId":"",
//     "categoryId": "",
//     "subCategory":[
//         "subCategoryName": "",
//         "features": []
//     ]
// }