const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../auth');
const router = express.Router();

router.post('/register', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err = new Error('Could not hash!');
            err.status = 500;
            return next(err);
        }
        User
            .create({
            fullName: req.body.fullName,
            address1: req.body.address1,
            address2: req.body.address2,
            address3: req.body.address3,
            phone: req.body.phone,
            mobilePhone: req.body.mobilePhone,
            email: req.body.email,
            password: hash,
            image: req.body.image
        })
            .then((user) => {
                let token = jwt.sign({
                    _id: user._id
                }, "this is secret key");
                res.json({status: "Signup success!", token: token});
            })
            .catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User
        .findOne({email: req.body.email})
        .then((user) => {
            if (user == null) {
                let err = new Error("User not found!");
                err.status = 401;
                return next(err);
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: user._id
                        }, "This is secret");
                        res.json({status: 'Login success!', token: token, admin: user.admin});
                    })
                    .catch(next);
            }

        })
        .catch(next);
})

//get all user

router.get('/all', auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    User
        .find({admin: false})
        .then((result) => {
            res.json(result)
        })
        .catch(next)
})

router.get('/me', auth.verifyUser, (req, res, next) => {
    User
        .findById({_id: req.user._id})
        .then((user) => {
            res.json(user)
        })
        .catch(next)
})
router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate({
        _id: req.user._id
    }, req.body).then(() => {
        User
            .findOne({_id: req.user._id})
            .then((user) => {
                res.json(user)
            })
            .catch(next)
    })
})

router.post("/password", auth.verifyUser, (req, res, next) => {
    User
        .findById({_id: req.user._id})
        .then((user) => {

            bcrypt
                .compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        let err = new Error('Password does not match!');
                        err.status = 401;
                        return next(err);
                    }
                    else{
                        res.json({message:"Password matched"});
                    }
        })
    })  
})

router.delete("/:id",auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    User.findByIdAndDelete({_id:req.params.id})
    .then((result)=>{
        res.json({message:"Delted sucessfully"})
    })
    .catch(next);
})

router.put("/password/update", auth.verifyUser, (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err = new Error('Could not hash!');
            err.status = 500;
            return next(err);
        }

        User.findByIdAndUpdate({_id:req.user._id},{password:hash})
        .then(()=>{
                User.findOne({_id:req.user._id})
                .then((result)=>{
                    res.json({message:"Password sucessfully changed"})
                })
                .catch((next))
        })
        .catch(next)
    })  
})

//count total users

router.get('/total/count', (req, res, next) => {
    User
        .find({})
        .count()
        .then((result) => {
            res.json(result)
        })
        .catch(next)
})

module.exports = router;