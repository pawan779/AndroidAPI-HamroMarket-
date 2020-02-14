const express=require('express');
const router=express.Router();
const Cart=require('../models/carts');
const auth=require('../auth');




router.post("/",auth.verifyUser, async (req, res) => {
    const { productId, quantity, price,image,productName } = req.body;
    var{grandTotal}=req.body
  
    let user = await Cart.findOne({user:req.user._id}); //TODO: the logged in user id
  
    try {
      let cart = await Cart.findOne({ user:req.user._id });
  
      if (user) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          productItem.total=quantity*productItem.price;
          cart.products[itemIndex] = productItem;
         


        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId,productName, quantity, price,total:quantity*price,image });
    

        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          user:req.user._id,
          products: [{ productId,productName, quantity, price ,total:quantity*price,image}]
         
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });


  router.get('/',auth.verifyUser,(req,res,next)=>{
    Cart.findOne({user:req.user._id})
    .then((result)=>{
      res.json({
        products:result.products,
        price:result.products.price

      })
    })
    .catch(next)
  })

  // router.delete("/:id",auth.verifyUser, async (req, res) => {
  //   const { productId, quantity, price,image,productName } = req.body;
  
  //   let user = await Cart.findOne({user:req.user._id}); //TODO: the logged in user id
  
  //   try {
  //     let cart = await Cart.findOne({ user:req.user._id });
  
  //     if (user) {
  //       //cart exists for user
  //       let itemIndex = cart.products.findIndex(p => p.productId == req.params.id);
  
  //       if (itemIndex > -1) {
  //         //product exists in the cart, update the quantity
  //         let productItem = cart.products[itemIndex];
          
  //         productItem.quantity = quantity;
  //         productItem.total=quantity*productItem.price
  //         cart.products[itemIndex] = productItem;
  //       }
  //     }
  //     cart = await cart.delete();
  //     return res.status(201).send(cart);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     res.status(500).send("Something went wrong");
  //   }
  // })


  router.put("/:id",auth.verifyUser,(req,res,next)=>{
    Cart.products.findById({_id:req.params.id},req.body)
    .then(()=>
    {
      Cart.products.findOne({_id:req.params.id})
      .then((result)=>{
        res.json(result)
      })
      .catch(next)
    })
    .catch(next)
  })

  module.exports=router;