const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true,'fullName is required']
    },
    email: {
        type: String,
        required: [true,'email is required'],
        unique:true
    },
   
    mobilePhone: {
        type: String,
        required: [true,'mobile phone is required'],
        minlength: 10
    },
    message:
    {
        type:String,
        required:[true,'message is required']
    }
  
});

module.exports = mongoose.model('Feedback', feedbackSchema);