const express=require("express");
const mongoose=require("mongoose");
const morgan = require('morgan');
const user=require("./models/users")
const dotenv = require('dotenv').config();
const userRouter=require('./routes/users');
const uploadRouter=require('./routes/upload');



const app=express();
app.use(express.json());
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



app.use('/users',userRouter);
app.use('/upload',uploadRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT,() =>{
    console.log(`App is running at localhost:${process.env.PORT}`);
})

