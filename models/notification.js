const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
   message:{
       type:String
   },
   messageBody:{
       type:String
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);