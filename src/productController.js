Product = require('../models/productModel');
Size = require('../models/sizeModel');
Tag = require('../models/tagModel');

const jwt = require('jsonwebtoken');
const config = require('../config/secrets');

async function getSize(product){
    try{
        var sizes = await Size.find({_id: { $in: product.sizes}}).sort({order: 1})
        var sizesName = [];
        for(let i=0; i<sizes.length;i++){
            sizesName.push(sizes[i].name);
        }
        return sizesName;
    }
    catch(error){
        res.send(error);
    }
}

async function getTags(product){
    try{
        for(let i=0;i<product.tags.length;i++){
            var tags = await Tag.find({_id: product.tags[i]});
        }
        return tags
    }
    catch(error){
        res.send(error);
    }
}

exports.getAllProducts = async function(req, res){
    try{
        var products = await Product.find({active: true}).sort({viewed_times: -1});
        for(let i=0;i<products.length;i++){
            products[i].sizes = await getSize(products[i]);
            products[i].tags = await getTags(products[i]);
        }
        res.json(products)
    }
    catch(error){
        res.send(error);
    }
};

exports.getProduct = async function(req, res){
    try{
        var product = await Product.findOne({_id: req.params.productId});
        res.json(product);
    }
    catch(error){
        res.send(error);
    }
};

exports.createProduct = async function(req, res){
    try{
        var newProduct = await new Product(req.body).save();
        res.json(newProduct);
    }
    catch(error){
        res.send(error)
    }
};

exports.addSizeToProduct = async function(req, res){
    try{
        var product = await Product.findOne({_id: req.body.id});
        if(product.sizes.length > 0 && typeof product.sizes !== 'undefined' && product.sizes != null){
            var newSizes = product.sizes.concat(req.body.sizes);
        }
        else{
            var newSizes = req.body.sizes;
        }
        product = await Product.findOneAndUpdate({_id: req.body.id}, {sizes: newSizes});
        res.json(product);
    }
    catch(error){
        res.send(error);
    }
};

exports.addTagsToProduct = async function(req, res){
    try{
        var product = await Product.find({_id: req.body.id});
        var newTags = await product.tags.push.apply(req.body.tags);
        product = await Product.findOneAndUpdate({_id: req.post.id}, {tags: newTags});
        res.json(product);
    }
    catch(error){
        res.send(error);
    }
};

exports.productViewed = async function(req, res){
    try{
        var viewedProduct = await Product.findOneAndUpdate({_id: req.body.id}, { $inc: { viewed_times: 1}});
        res.json(viewedProduct);
    }
    catch(error){
        res.send(error);
    }
};

exports.disableProduct = async function(req, res){
    try{
        var disableProduct = await Product.findOneAndUpdate({_id: req.body.id}, {active: false});
        res.json(disableProduct);
    }
    catch(error){
        res.send(error);
    }
};

exports.updateImage = async function(req, res){
    try{
        var updatedProduct = await Product.findOneAndUpdate({_id: req.body.id}, { picture: req.body.picture});
        res.json(updatedProduct);
    }
    catch(error){
        res.send(error);
    }
};

exports.activateProduct = async function(req, res){
    try{
        var activeProduct = await Product.findOneAndUpdate({_id: req.body.id}, { active : true});
        res.json(activeProduct);
    }
    catch(error){
        res.send(error);
    }
};