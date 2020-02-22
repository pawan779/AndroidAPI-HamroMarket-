const express=require('express');
const router=express.Router();
const Feedback=require('../models/feedback');
const auth=require('../auth')

router.post('/',(req,res,next)=>{
    Feedback.create(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

router.get('/',auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    sort={_id:-1}
    Feedback.find({}).sort(sort)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})


//count total feedbacks

router.get('/total/count',(req,res,next)=>{
    Feedback.find({}).count()
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})





module.exports=router