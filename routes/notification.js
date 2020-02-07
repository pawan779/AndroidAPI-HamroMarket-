const express = require('express');
const Notification = require('../models/notification');
const router = express.Router();
const auth = require('../auth');

router.post('/',auth.verifyAdmin,(req,res,next)=>{
    let notification=new Notification(req.body);
    notification.user=req.user._id;
    notification.save()
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

module.exports=router