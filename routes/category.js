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
router.post('/',auth.verifyAdmin,(req,res,next)=>{
    Category.create(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

router.get('/:id',auth.verifyAdmin,(req,res,next)=>{
    Category.findById({_id:req.params.id})
    .then((result)=>
    {
        res.json(result)
    })
    .catch(next)
})


//for user

router.get('/product/:id',(req,res,next)=>{
    Category.findById({_id:req.params.id})
    .then((result)=>
    {
        res.json(result)
    })
    .catch(next)
})

router.put('/:id',auth.verifyAdmin,(req,res,next)=>{
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
router.delete("/:id",auth.verifyAdmin,(req,res,next)=>{
    Category.findByIdAndDelete({_id:req.params.id})
    .then((result)=>
    {
        res.json({"meassage":"deleted sucessfully!!"})
    })
    .catch(next)
})

module.exports=router;