Product = require('../models/productModel');
Size = require('../models/sizeModel');

const jwt = require('jsonwebtoken');
const config = require('../config/secrets');

async function getSize(product){
    for(let i=0;i<product.sizes.length;i++){
        var sizes = await Size.find({_id: product.sizes[i]});
    }
    return sizes;
}

exports.getAllProducts = async function(req, res){
    var products = await Product.find({active: true}).sort({viewed_times: -1});
    for(let i=0;i<products.length;i++){
        products[i].sizes = await getSize(products[i]);
    }
    res.json(products)
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

exports.addSizeToProduct = async function(req, res){
    try{
        var product = await Product.find({_id: req.post.id});
        var newSizes = await product.sizes.push.apply(req.body.sizes);
        product = await Product.findOneAndUpdate({_id: req.post.id}, {sizes: newSizes});
        res.json(product);
    }
    catch(err){
        res.send(err);
    }
};

exports.addTagsToProduct = async function(req, res){
    try{
        var product = await Product.find({_id: req.post.id});
        var newTags = await product.tags.push.apply(req.body.tags);
        product = await Product.findOneAndUpdate({_id: req.post.id}, {tags: newTags});
        res.json(product);
    }
    catch(err){
        res.send(err);
    }
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

exports.updateImage = function(req, res){
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