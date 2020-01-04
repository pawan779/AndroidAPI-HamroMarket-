const express=require("express");
const mongoose=require("mongoose");
const user=require("./models/users")
const dotenv = require('dotenv').config();
const app=express();

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then((db)=>{
    console.log("Sucessfully connected to MongoDB server");
},(err)=>console.log(err));



app.listen(process.env.PORT,() =>{
    console.log(`App is running at localhost:${process.env.PORT}`);
})

