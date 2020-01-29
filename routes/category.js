const express=require('express')
const auth=require('../auth')
const router=express.Router();
const Category=require('../models/category')
const user=require('../models/users')

router.route('/')

.get((req,res,next)=>{
    Category.find({})
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})
.post(auth.verifyAdmin,(req,res,next)=>{
    Category.create(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

router.put('/:id',auth.verifyUser,(req,res,next)=>{
    Category.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(()=>{
        //to show all updated data
        Category.findOne({_id:req.params.id})
        .then((result)=>{
            res.json(result)
        })
    })
    .catch(next)
})

module.exports=router;