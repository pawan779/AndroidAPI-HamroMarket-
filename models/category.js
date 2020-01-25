const mongoose=require('mongoose');

let categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Category field is required"]
    }
}, {timestamps: true});

let Category=mongoose.model('Category',categorySchema);

module.exports=Category;