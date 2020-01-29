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
    }

}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);