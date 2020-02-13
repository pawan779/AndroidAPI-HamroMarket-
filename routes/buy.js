const express=require('express');
const router=express.Router();
const Cart=require('../models/carts');
const auth=require('../auth');


router.post("/",auth.verifyUser,(req, res,next) => {
    const { productId, quantity, price,image,productName } = req.body;
        //no cart for user, create new cart
        const newCart = Cart.create({
          user:req.user._id,
          products: [{ productId,productName, quantity, price ,total:quantity*price,image}]
         
        }).then
        ((result)=>{
          res.json(result)
        })
        .catch(next)
  
      })


      router.get('/:id',auth.verifyUser,(req,res,next)=>{
        Cart.findOne({user:req.user._id,_id:req.params.id})
        .then((result)=>{
          res.json({
            products:result.products,
            price:result.products.price
    
          })
        })
        .catch(next)
      })

  module.exports=router
