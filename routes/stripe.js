const express = require("express");
const stripe = require("stripe")("sk_test_R6SAv2s85B1Q1T2HGjo80GMq00MrD15sfO");
const uuid = require("uuid/v4");
const auth=require('../auth')

const router=express.Router();

// app.get("/", (req, res) => {
//   res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
// });

router.post("/",async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price*1000,
        currency: "npr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.productName}`,

      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports=router