const express=require("express");
const mongoose=require("mongoose");
const connection=require('./TestFolder/dbtest')
const morgan = require('morgan');
const user=require("./models/users")
const bodyParser=require('body-parser')
const dotenv = require('dotenv').config();
const userRouter=require('./routes/users');
const uploadRouter=require('./routes/upload');
const productRouter=require('./routes/products');
const categoryRouter=require('./routes/category')
const adminRouter=require('./routes/admin')
const buyRouter=require('./routes/buy')
const ordersRoute=require('./routes/orders');
const notificationRoute=require('./routes/notification')
const stripeRoute=require('./routes/stripe')
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
app.use('/checkout',stripeRoute)
app.use(auth.verifyUser);
app.use('/orders',ordersRoute);
app.use('/category',categoryRouter);
app.use('/buy',buyRouter);
app.use('/admin',adminRouter);
app.use('/notification',notificationRoute);



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

// app.listen(process.env.PORT,() =>{
//   console.log(`App is running at localhost:${process.env.PORT}`);
// })

connection.connect()
  .then(() =>{
    app.listen(process.env.PORT, () => {
      console.log(`App is running at localhost:${process.env.PORT}`);
    });

})
  module.exports= app;

