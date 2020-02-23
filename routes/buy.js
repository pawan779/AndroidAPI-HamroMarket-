const express=require('express');
const router=express.Router();
const Cart=require('../models/carts');
const ProductOrder=require('../models/productOrder')
const auth=require('../auth');


router.post("/",auth.verifyUser,(req, res,next) => {
    const { productId, quantity, price,image,productName } = req.body;
        //no cart for user, create new cart
        const newCart = Cart.create({
          user:req.user._id,
          products: [{ productId,productName, quantity, price ,total:quantity*price,image}]
         
        }).then
        ((result)=>{
          res.json({
            _id:result._id
          })
        })
        .catch(next)
  
      })


      router.post('/buy',auth.verifyUser,(req,res,next)=>{
        let order=new ProductOrder(req.body);
        order.user=req.user._id;
        order.total=req.body.price*req.body.quantity;
        order.save()
        .then((result)=>{
          res.json(result)
        })
        .catch(next)
      })

      
      router.get('/:id',auth.verifyUser,(req,res,next)=>{
        Cart.findOne({user:req.user._id,_id:req.params.id})
        .then((result)=>{
          res.json({
            products:result.products,
            cart:result
          })
        })
        .catch(next)
      })

  //get purchased product

  router.get('/',auth.verifyUser,(req,res,next)=>{
    sort={_id:-1}
    ProductOrder.find({user:req.user._id}).sort(sort)
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

  module.exports=router
