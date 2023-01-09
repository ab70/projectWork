const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    email: { type: String, required: false, trim: true, default: ''},
    phone: {type: String, trim: true, required: false , default: ''},
    address: { type: String, trim: true },
    password: { type: String, trim: true, required: true},
    isAdmin: { type: Boolean, default:false},
    accountStatus:{type:String, trim: true, enum:['active','inactive'],default:"active" },
    dateOfBirth:{type:Date,},
    education:{type:String, trim:true, default:''},
    currentJob:{type:String,trim:true,default:''},
    gender:{type:String,trim:true,enum:['male','female'],default:''},
    note:{type:String,trim:true},
    isOtpAuthenticated: { type: Boolean, default: false },
    otp:{ type: Number, default: 0,},
    userRoles: [{type: mongoose.Schema.Types.ObjectId,ref: 'Role'}],
    marchantInfo: {
        PersonName: {type: String, trim: true, default: ''},
        sellerName: {type: String, trim: true, default: ''},
        profileCreatedBy: {type: String, trim: true, default: ''},
        varifiedBy: {type:String, trim: true, default: ''},
        marchantStatus: {type: Boolean, default: false},
        sellerAddress: { type: String, trim: true, default: '' },
        VerificationIcon: {type: Boolean, default: false},
        email: {type: String, default: '', trim: true},
        bankBkashNum: {type: String, default: '', trim: true},
        totalSaleCOD: {type: Number, default: 0},
        totalSaleCASH: { type: Number, default: 0},
        payAlready: {type: Number, default: 0 },
        due: {type: Number, default: 0 },
        mobileNumber: [{number: {type: String, default:''}, varified: {type: Boolean, default: false}}],
        pageUserName: {type: String, default: ''},
        documentImg: [{img: {type: String, trim: true}}]
    }   
    
},{ timestamps: true})

module.exports = mongoose.model("User", UserSchema)