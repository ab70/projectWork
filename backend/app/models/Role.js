const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, uppercase: true},
    permittedLinkes: [{
        type: String,
    }]
}, {timestamps: true})

module.exports = mongoose.model('Role', RoleSchema)