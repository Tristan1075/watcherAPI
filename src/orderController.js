Order = require('../models/orderModel');
OrderProduct = require('../models/orderProductModel');
Product = require('../models/productModel');
const jwt = require('jsonwebtoken');
const config = require('../config/secrets');
const stripe = require("stripe")("sk_test_DH7gtTJ7XlHZR61iXtHuFjif00OO9eeJI5");

/*
id user
id_shipping adress
 */
exports.order_create = function(req, res){
    var new_order = new Order(req.body);
    new_order.state = 0;
    new_order.save(function(err,order){
        if(err) res.send(err);
        res.json(order);
    })
};

exports.order_pay = function(req, res){
    Order.findOne({_id: req.body.id_order}, function(err, order){
        if(err) res.send(err);
        var amount = 0;
        OrderProduct.find().all('id_order', order._id, function(err, products){
           for( let i = 0; i < products.length; i++){
               Product.findOne({_id: products[i]._id}, function(err, product){
                  amount += product.price;
               });
           }
        });
        stripe.charges.create({
                amount: amount, // Unit: cents
                currency: 'eur',
                source: req.body.tokenId,
                description: 'Test payment',
            })
            .then(result => res.status(200).json(result));
    });
};

exports.order_total_price = function(req, res){
    Order.findOne({_id: req.body.id_order}, function(err, order){
        if(err) res.send(err);
        var amount = 0;
        OrderProduct.find().all('id_order', order._id, function(err, products){
            for( let i = 0; i < products.length; i++){
                Product.findOne({_id: products[i]._id}, function(err, product){
                    amount += product.price;
                });
            }
        });
        res.json({price: amount});
    });
};

exports.order_products = function(req, res){
    Order.findOne({_id: req.body.id_order}, function(err, order){
        if(err) res.send(err);
        let productsArray = [];
        OrderProduct.find().all('id_order', order._id, function(err, products){
            for( let i = 0; i < products.length; i++){
                Product.findOne({_id: products[i]._id}, function(err, product){
                    productsArray.push(product);
                });
            }
        });
        res.json(productsArray);
    });
};

exports.order_cancel = function(req, res){
    Order.findOne({id: req.body.id_order}, function(err, order){
        if(err) res.send(err);
        if(order.state === 3 || order.state === 1){
            Order.update({_id: order._id}, {state: 5} ,function(err, order){
                if(err) res.send(err);
                res.sendStatus(200);
            })
        }
    });
};

exports.order_state = async function(req, res){
    Order.findOne({id: req.body.id_order}, function(err, order){
       if(err) res.send(err);
       res.json(order.state);
    });
};

exports.order_history = async function(req, res){
    Order.find({id_user: req.body.id_user}, function(err, orders){
        if(err) res.send(err);
        res.json(orders);
    });
};
