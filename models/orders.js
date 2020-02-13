const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: String,
        // required: true
    },
    productId: {
        type: String,
        // required: true
    },
    cartId: {
        type: String,
        // required: true
    },
    type:{
        type:Boolean,
        default:true
    }

}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);