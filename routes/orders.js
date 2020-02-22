const express = require('express');

const Order = require('../models/orders');
const auth = require('../auth');
const router = express.Router();

router.post('/',auth.verifyUser,(req,res,next)=>{
    
    let orders=new Order(req.body)
    orders.user=req.user._id
    orders.save()
    .then((result)=>
    {
        res.json(result)
    })
    .catch(next)
})

router.get('/:id',auth.verifyUser,(req,res,next)=>{
    Order.findById({user:req.user._id,_id:req.params.id})
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

//all purchased product

router.get('/my/product',auth.verifyUser,(req,res,next)=>{
    Order.find({user:req.user._id})
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

//count total orders

router.get('/total/count',(req,res,next)=>{
    Order.find({}).countDocuments()
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})


module.exports=router