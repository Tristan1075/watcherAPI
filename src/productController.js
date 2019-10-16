Product = require('../models/productModel');
ProductSize = require('../models/productSizeModel');
ProductTags = require('../models/productTagsModel');

const jwt = require('jsonwebtoken');
const config = require('../config/secrets');

exports.getAllProducts = function(req, res){
    Product.find({active: true}, function (err, product) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(product);
        }
    }).sort({viewed_times: -1});
};


exports.getProduct = function(req, res){
    Product.findOne({_id: req.params.productId}, function(err, product){
        if (err) {
            res.send(err);
        }
        else {
            res.json(product);
        }
    });
};

exports.createProduct = function(req, res){
    var newProduct = new Product(req.body);
    newProduct.save(function(err,product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.addSizeToProduct = function(req, res){
    var newProductSize = new ProductSize(req.body);
    newProductSize.save(function(err,productSize){
        if(err){
            res.send(err);
        }
        else{
            res.json(productSize);
        }
    });
};

exports.addTagsToProduct = function(req, res){
    var newProductTag = new ProductTags(req.body);
    newProductTag.save(function(err,productTag){
        if(err){
            res.send(err);
        }
        else{
            res.json(productTag);
        }
    });
};

exports.productViewed = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { $inc: { viewed_times: 1}}, function (err, product) {
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.disableProduct = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { active: false }, function(err, product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.updatePicture = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { picture: req.body.picture}, function(err, product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};

exports.activateProduct = function(req, res){
    Product.findOneAndUpdate({_id: req.body.id}, { active : true}, function(err, product){
        if(err){
            res.send(err);
        }
        else{
            res.json(product);
        }
    });
};