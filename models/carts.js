const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
    products: [
      {
        productId: String,
        quantity: Number,
        price: Number,
        total:String
      }
    ],
    grandTotal:{
      type:String
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);