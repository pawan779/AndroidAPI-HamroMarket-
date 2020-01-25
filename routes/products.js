const express = require('express');
const Product = require('../models/products');
const router = express.Router();
const auth = require('../auth');

router
    .route('/')
    .get((req, res, next) => {
        Product.find({}, (err, products) => {
            if (err) {
                res.json(next)
            }
            res.json(products)
        });
    })
    .post((req, res, next) => {

        Product
            .create({
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productType: req.body.productType,
                image: req.body.image,
                user: req.body.user._id
            })
            .then((product) => {
                res.statusCode = 201;
                res.json({
                    product
                });
            })
            .catch(next);
    })

module.exports = router;