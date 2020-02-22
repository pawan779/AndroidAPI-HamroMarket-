const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true,'fullName is required']
    },
    email: {
        type: String,
        required: [true,'email is required']
    },
   
    mobilePhone: {
        type: String,
        required: [true,'mobile phone is required']
    },
    message:
    {
        type:String,
        required:[true,'message is required']
    }
  
});

module.exports = mongoose.model('Feedback', feedbackSchema);