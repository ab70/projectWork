const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    email: { type: String, unique: true, trim: true, lowercase: true},
    phone: {type: String, unique: true, trim: true, minleangth: 11, maxlength: 11},
    address: { type: String, trim: true },
    password: { type: String, unique: true, trim: true, required: true},
    isAdmin: { type: Boolean, default: false},
    isOtpAuthenticated: { type: Boolean, default: false },


},{ timestamps: true})

module.exports = mongoose.model("User", UserSchema)