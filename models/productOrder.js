const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    productId: String,
    productName: String,
    quantity: Number,
    price: Number,
    total: String,
    image: String,
    address1:{
        type:String,
    },
    address2:{
        type:String,
        
    },
    address3:{
        type:String,
    
    },
    active: {
        type: Boolean,
        default: true
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true});

module.exports = mongoose.model("ProductOrder", productOrderSchema);