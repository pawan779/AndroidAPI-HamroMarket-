const express = require('express');
const Product = require('../models/products');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.get('/product/:id',auth.verifyAdmin,(req,res,next)=>
{
    Product.findById({_id:req.params.id})
    .then((result)=>
    {
        res.json(result)
    })
    .catch(next)
})


//to get name from particular id

router.get('/users/:id',auth.verifyAdmin,(req,res,next)=>{
    User.findById({_id:req.params.id})
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

router.get('/products',auth.verifyAdmin,(req, res, next) => {
    var sort={_id:-1}
    Product.find({}).sort(sort)
     .then((result)=>{
         res.json(result)
     })
     .catch(next)
})


//verify the product
router.put('/product/:id',auth.verifyAdmin,(req,res,next)=>{
    Product.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(()=>{
        Product.findOne({_id:req.params.id})
        .then((result)=>{
            res.json({
            isVerified:req.body.isVerified
            })
    })
    
    })
    .catch(next)
})


  //to get latest verified products

  router.get('/verified',auth.verifyAdmin,(req,res,next)=>{
      const sort={_id:-1}
    Product.find({isVerified:true}).sort(sort)
    .then((result)=>
    {
        res.json(result)
    })
    .catch(next)
})
 //to get latest notverified products

 router.get('/notverified',auth.verifyAdmin,(req,res,next)=>{
    const sort={_id:-1}
    Product.find({isVerified:false}).sort(sort)
    .then((result)=>
    {
        res.json(result)
    })
    .catch(next)
})
   

module.exports=router;