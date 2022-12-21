const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    id: {type: String, trim: true,unique:true, default: ''},
    divison_id: {type: String, trim:true},
    name: {type: String, trim:true},
    bn_name:{type: String, trim:true},
    lat:{type: String, trim:true},
    long:{type: String, trim:true}
})

module.exports = mongoose.model('Location',LocationSchema )