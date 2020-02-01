const express = require('express');
const Product = require('../models/products');
const router = express.Router();
const auth = require('../auth');

router.get("/product/:id",auth.verifyAdmin,(req,res,next)=>{
    Product.findById({_id:req.params.id})
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

module.exports=router;