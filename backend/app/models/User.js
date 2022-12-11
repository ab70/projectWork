const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    email: { type: String, unique: true, required: false, trim: true, default: ''},
    phone: {type: String, trim: true, required: false , default: ''},
    address: { type: String, trim: true },
    password: { type: String, trim: true, required: true},
    isAdmin: { type: Boolean, default: false},
    isOtpAuthenticated: { type: Boolean, default: false },
    

},{ timestamps: true})

module.exports = mongoose.model("User", UserSchema)