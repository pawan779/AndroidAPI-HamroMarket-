const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true,'fullName is required']
    },
    email: {
        type: String,
        required: [true,'email is required'],
        unique:true
    },
    address1: {
        type: String
    },
    address2: {
        type: String,
    },
    address3: {
        type: String,
    },
    phone: {
        type: String
    },
    mobilePhone: {
        type: String,
        required: [true,'mobile phone is required'],
        minlength: 10
    },
    password: {
        type: String,
        required: [true,'password is required']
    },
    image: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);