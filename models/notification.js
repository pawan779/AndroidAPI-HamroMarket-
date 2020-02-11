const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
   message:{
       type:String
   },
   messageBody:{
       type:String
   },
   status:{
     type:Boolean,
     default:true
   },
   show:{
     type:Boolean,
     default:true
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);