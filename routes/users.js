const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/users');

const router=express.Router();

router.post('/signup',(req,res,next)=>{
    let password=req.body.password;
    bcrypt.hash(password,10,(err,hash)=>
    {
        if(err){
            let err=new Error("Couldnot hash!");
            err.status=500;
            return next(err);
        }

        User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            address:req.body.address,
            phone:req.body.phone,
            username:req.body.username,
            password:hash,
            image:req.body.image
        })
        .then((user)=>{
            let token=jwt.sign({_id:user_id},
                process.env.SECRET);
                res.json({status:"Signup sucessfully!",
                token:token});
        }).catch(next);
    });
});

module.exports=router;