const mongoose = require('mongoose')

const SortingSchema = new mongoose.Schema({
    sortName:{type:String, required:true, default:''}
},{timestamps:true})

const Sortschema = mongoose.model("Sort", SortingSchema)

module.exports = Sortschema