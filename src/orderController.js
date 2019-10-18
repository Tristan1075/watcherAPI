Order = require('../models/orderModel');
Product = require('../models/productModel');
const jwt = require('jsonwebtoken');
const config = require('../config/secrets');
const stripe = require("stripe")("sk_test_DH7gtTJ7XlHZR61iXtHuFjif00OO9eeJI5");
var mongoose = require('mongoose');

/*
id user
id_shipping adress
 */
exports.order_create = async function(req, res){
    try{
        var new_order = new Order(req.body);
        new_order.state = 0;
        var order = await new_order.save();
        res.json(order);
    }
    catch(error){
        res.send(error);
    }
};

async function getProducts(order){
    try{
        var orderProducts = [];
        for(let i=0;i<order.products.length;i++){
            orderProducts.push(order.products[i].product);
        }
        var products = await Product.find({_id: { $in: orderProducts }});
        return products;
    }
    catch(error){
        console.log(error);
    }
}

async function getLineOrder(order){
    try{
        var products = [];
        for(let i=0;i<order.products.length;i++){
            var product = await Product.findOne({_id: order.products[i].product})
            let lineOrder = { product: product, quantity: order.products[i].quantity }
            products.push(lineOrder)
        }
        return products;
    }
    catch(error){
        console.log(error);
    }
}

async function getProductsAmount(order){
    try{
        var amount = 0;
        var products = await getLineOrder(order);
        for(let i=0; i<products.length;i++){
            amount += products[i].product.price * products[i].quantity;
        }
        return amount;
    }
    catch(error){
        console.log(error);
    }
}

exports.order_pay = async function(req, res){
    try{
        console.log("new order made");
        var result = await stripe.charges.create({
            amount: req.body.totalCart, // Unit: cents
            currency: 'eur',
            source: req.body.tokenId,
            description: 'Test payment',
            customer: "cus_G08rEDwjETa8K5"
        });
        let newOrder = new Order();
        console.log("newOrder obj created : " + newOrder);
        newOrder.id_user = mongoose.Types.ObjectId(req.body.idUser);
        newOrder.id_shipping = mongoose.Types.ObjectId();
        newOrder.state = 1;
        newOrder.date_created = Date.now();
        newOrder.products = req.body.allIdProducts;
        newOrder.save();
        console.log("newOrder : " + newOrder);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
};

exports.order_total_price = async function(req, res){
    try{
        var order = await Order.findOne({_id: req.body.id_order});
        var amount = await getProductsAmount(order);
        res.json({price: amount});
    }
    catch(error){
        res.send(error);
    }
};

exports.order_products = async function(req, res){
    try{
        var order = await Order.findOne({_id: req.body.id_order});
        let products = getProducts(order);
        res.json(products);
    }
    catch(error){
        res.send(error);
    }
};

exports.order_cancel = async function(req, res){
    try{
        var order = await Order.findOne({id: req.body.id_order});
        if(order.state === 3 || order.state === 1){
            await Order.update({_id: order._id}, {state: 5});
            res.sendStatus(200);
        };
    }
    catch(error){
        res.send(error);
    }
};

exports.order_state = async function(req, res){
    try{
        var order = await Order.findOne({id: req.body.id_order})
        res.json(order.state);
    }
    catch(error){
        res.send(error);
    }
};

exports.order_history = async function(req, res){
    try{
        var orders = await Order.find({id_user: req.body.id_user});
        console.log("retrieved orders for id_user : " + req.body.id_user);
        res.json(orders);
    }
    catch(error){
        console.log(error.toString());
    }
};

exports.add_product = async function(req, res){
    try{
        var order = await Order.findOne({_id: req.body.id_order});
        if(order.products.length > 0 && typeof order.products !== 'undefined' && order.products != null){
            var newProducts = order.products.concat(req.body.products);
        }
        else{
            var newProducts = req.body.products;
        }
        order = await Order.findOneAndUpdate({_id: req.body.id_order}, {products: newProducts})
        res.json(order);
    }
    catch(error){
        res.send(error);
    }
}

exports.remove_product = async function(req,res){
    try{
        var order = await Order.findOne({_id: req.body.id_order});
        if(order.products.length > 0 && typeof order.products !== 'undefined' && order.products != null){
            for(let i=0; i<order.products.length;i++){
                if(order.products[i] === req.body.id_product){
                    order.products.splice(i, 1);
                }
            }
        }
    }
    catch(error){
        res.send(error);
    }
}
