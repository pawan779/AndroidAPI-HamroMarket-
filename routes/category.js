const express=require('express')
const auth=require('../auth')
const router=express.Router();
const Category=require('../models/category')

router.route('/')

.get(auth.verifyUser,(req,res,next)=>{
    Category.find({})
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})
.post(auth.verifyUser,(req,res,next)=>{
    Category.create(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

module.exports=router;