const express=require('express');
const router=express.Router();
const Feedback=require('../models/feedback');

router.post('/',(req,res,next)=>{
    Feedback.create(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})





module.exports=router