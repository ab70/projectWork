const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, uppercase: true},
    link: {type: String, required: true, trim: true}
}, {timestamps: true})

module.exports = mongoose.model('Role', RoleSchema)