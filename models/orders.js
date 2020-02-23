const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },    
  
    address1:{
        type:String,
    },
    address2:{
        type:String,
        
    },
    address3:{
        type:String,
    
    },
    type:{
        type:Boolean,
    
    }

}, {timestamps: true});

module.exports = mongoose.model('Orders', orderSchema);