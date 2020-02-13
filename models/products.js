const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        // required: true
    },
    productPrice: {
        type: String,
        // required: true
    },
    productCondition: {
        type: String,
        // required: true
    },
    productDescription: {
        type: String,
        // required: true
    },
    image: {
        type: String
    },
    quantity:{
        type:Number
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    available:{
        type:Boolean,
        default:true

    }

}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);