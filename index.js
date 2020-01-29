const express=require("express");
const mongoose=require("mongoose");
const morgan = require('morgan');
const user=require("./models/users")
const bodyParser=require('body-parser')
const dotenv = require('dotenv').config();
const userRouter=require('./routes/users');
const uploadRouter=require('./routes/upload');
const productRouter=require('./routes/products');
const categoryRouter=require('./routes/category')
const cors = require('cors')
const auth=require('./auth')


const app=express();
app.use(bodyParser.json());
app.use(morgan("tiny"))
app.use(cors());
app.use(express.urlencoded({extended: true }));
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
app.use('/products',productRouter);
app.use(auth.verifyUser);
app.use('/category',categoryRouter);


//for error handelling middleware
// app.use((err, req, res, next) => {
//     res.statusCode = 422;
//     res.json({ status: err.message });
// });


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT,() =>{
    console.log(`App is running at localhost:${process.env.PORT}`);
})

