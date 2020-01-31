const express = require('express');
const Product = require('../models/products');
const router = express.Router();
const auth = require('../auth');

router
    .route('/')
    .get((req, res, next) => {
        Product.find({})
         .then((result)=>{
             res.json(result)
         })
         .catch(next)
    })
    .post(auth.verifyUser,(req, res, next) => {

        let product=new Product(req.body);
        product.user=req.user._id
        product.save()
            .then((product) => {
                res.statusCode = 200;
                res.json({
                    product
                });
            })
            .catch(next);
    })

router.get("/my",auth.verifyUser,(req,res,next)=>{
    Product.find({user:req.user._id})
    .then((product)=>{
        res.json(product)
    })
    .catch(next)
})
router.get("/my/:id",auth.verifyUser,(req,res,next)=>{
    Product.find({_id:req.params.id})
    .then((product)=>{
        res.json(product)
    })
    .catch(next)
})
  

module.exports = router;