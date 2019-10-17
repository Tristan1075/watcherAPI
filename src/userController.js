User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/secrets');
const stripe = require("stripe")("sk_test_DH7gtTJ7XlHZR61iXtHuFjif00OO9eeJI5");

exports.user_register = async function(req, res){
    try{
        var new_user = new User(req.body);
        const customer = await stripe.customers.create({
            email: req.body.email,
            name: req.body.name
        });
        new_user.id_stripe = customer.id;
        user = await new_user.save();
        res.json(user);
    }
    catch(error){
        res.send(error);
    }
};

exports.user_login = async function(req, res){
    try{
        var token = await User.findOne({email: req.body.email});
        if(user.email === req.body.email && user.password === req.body.password){
            var token = await jwt.sign({user: user}, config.secrets.jwt_key, {expiresIn: '30 days'});
            res.json(token)
        }else{
            res.sendStatus(400);
        }
    }
    catch(error){
        res.send(error);
    }
};
