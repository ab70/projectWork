const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    chatUsers: {
        type: Array,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    sender: { type: mongoose.Schema.Types.ObjectId, reuired: true },
}, { timestamps: true })


module.exports = mongoose.model("Chat", ChatSchema)