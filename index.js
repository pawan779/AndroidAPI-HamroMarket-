const express=require("express");
const dotenv = require('dotenv').config();
const app=express();

app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT,() =>{
    console.log(`App is running at localhost:${process.env.PORT}`);
})