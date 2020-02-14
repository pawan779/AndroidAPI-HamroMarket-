const express = require('express');
const Notification = require('../models/notification');
const router = express.Router();
const auth = require('../auth');

router.post('/',auth.verifyAdmin,(req,res,next)=>{
    Notification.create(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

router.get('/',(req,res,next)=>{
    var sort={_id:-1};
    Notification.findOne({user:req.user._id,status:true}).sort(sort)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})
router.put('/',(req,res,next)=>{

    Notification.findOneAndUpdate({user:req.user._id,show:true},req.body)
    .then(()=>{
        Notification.findOne({user:req.user._id})
        .then((result)=>{
            res.json(result)
        })
        .catch(next)
    })
    .catch(next)
})

module.exports=router