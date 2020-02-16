const express = require('express');
const Product = require('../models/products');
const router = express.Router();
const auth = require('../auth');

router
    .route('/')
    .get((req, res, next) => {
        Product.find({isVerified:true})
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
                    product,
                    _id:product._id
                });
            })
            .catch(next);
    })


    //to get latest 10 products

    router.get('/latest',(req,res,next)=>{
        var sort={_id:-1}
        Product.find({isVerified:true}).sort(sort).limit(10)
        .then((result)=>
        {
            res.json(result)
        })
        .catch(next)
    })
  

router.get("/my",auth.verifyUser,(req,res,next)=>{
    Product.find({user:req.user._id})
    .then((product)=>{
        res.json(product)
    })
    .catch(next)
})

//get the clicked product
router.get("/:id",(req,res,next)=>{
    Product.findById({_id:req.params.id})
    .then((product)=>{
        res.json(product)
    })
    .catch(next)
})

router.get("/my/:id",auth.verifyUser,(req,res,next)=>{
    Product.findById({_id:req.params.id,user:req.user._id})
    .then((product)=>{
        res.json(product)
    })
    .catch(next)
})


//to edit user product
router.put("/:id",auth.verifyUser,(req,res,next)=>{
    Product.findByIdAndUpdate({_id:req.params.id,user:req.user._id},req.body)
    .then(()=>{
        Product.findOne({_id:req.params.id})
        .then((result)=>{
            res.json(result)
        })
        .catch(next)
    })
    .catch(next)
})

router.delete("/:id",auth.verifyUser,(req,res,next)=>{

    Product.findByIdAndDelete({_id:req.params.id})
    .then((result)=>{
        res.json({"message":"product deleted sucessfylly"})
    })
    .catch(next)  

})



module.exports = router;