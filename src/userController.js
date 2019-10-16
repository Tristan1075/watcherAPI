User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/secrets');
const stripe = require("stripe")("sk_test_DH7gtTJ7XlHZR61iXtHuFjif00OO9eeJI5");

exports.user_register = async function(req, res){
    var new_user = new User(req.body);
    const customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.name
    });
    new_user.id_stripe = customer.id;
    new_user.save(function(err,user){
        if(err) res.send(err);
        res.json(user);
    })
};

exports.user_login = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
       if(err) res.send(err);
       if(user.email === req.body.email && user.password === req.body.password){
           jwt.sign({user: user}, config.secrets.jwt_key, {expiresIn: '30 days'}, (err, token) => {
               if(err) res.send(err);
               res.json({token});
           });
       }else{
           res.sendStatus(400);
       }
    });
};
