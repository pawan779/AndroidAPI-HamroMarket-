const mongoose=require('mongoose');

let categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Category field is required"],
        unique:true
    }
}, {timestamps: true});

let Category=mongoose.model('Category',categorySchema);

module.exports=Category;