const express = require('express');
const Product = require('../models/products');
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

router.get('/products',auth.verifyAdmin,(req, res, next) => {
    Product.find({})
     .then((result)=>{
         res.json(result)
     })
     .catch(next)
})

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
   

module.exports=router;