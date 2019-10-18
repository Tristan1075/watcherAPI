Product = require('../models/productModel');
Size = require('../models/sizeModel');
Tag = require('../models/tagModel');

const jwt = require('jsonwebtoken');
const config = require('../config/secrets');

async function getSizes(product,res){
    try{
        let sizes = await Size.find({_id: { $in: product.sizes}}).sort({order: 1})
        let sizesName = [];
        for(let i=0; i<sizes.length;i++){
            sizesName.push(sizes[i].name);
        }
        return sizesName;
    }
    catch(error){
        res.send(error);
    }
}

async function getTags(product,res){
    try{
        let tags = await Tag.find({_id: { $in: product.tags }});
        let tagsName = [];
        for(let i=0;i<tags.length;i++){
            tagsName.push(tags[i].name);
        }
        return tagsName
    }
    catch(error){
        res.send(error);
    }
}

async function getProductsTagsAndSizes(products,res){
    try{
        for(let i=0;i<products.length;i++){
            products[i] = await getProductTagsAndSizes(products[i],res);
        }
        return products;
    }
    catch(error){
        res.send(error);
    }
}

async function getProductTagsAndSizes(product,res){
    try{
        product.sizes = await getSizes(products[i],res);
        product.tags = await getTags(products[i],res);
        return product;
    }
    catch(error){
        res.send(error);
    }
}

exports.getAllProducts = async function(req, res){
    try{
        let products = await Product.find({active: true}).sort({viewed_times: -1});
        products = await getProductsTagsAndSizes(products, res);
        res.json(products)
    }
    catch(error){
        res.send(error);
    }
};

exports.getProduct = async function(req, res){
    try{
        let product = await Product.findOne({_id: req.params.productId});
        product = await getProductTagsAndSizes(product,res);
        res.json(product);
    }
    catch(error){
        res.send(error);
    }
};

exports.createProduct = async function(req, res){
    try{
        let newProduct = await new Product(req.body).save();
        res.json(newProduct);
    }
    catch(error){
        res.send(error)
    }
};

function addReferences(existReference, newReference, res){
    try{
        let references = [];
        if(existReference.length > 0 && typeof existReference !== 'undefined' && existReference != null){
            references = existReference.concat(newReference);
        }
        else{
            references = newReference;
        }
        return references;
    }
    catch(error){
        res.send(error);
    }
}

exports.addSizeToProduct = async function(req, res){
    try{
        let product = await Product.findOne({_id: req.body.id});
        let newSizes = await addReferences(product,req.body.sizes,res);
        product = await Product.findOneAndUpdate({_id: req.body.id}, {sizes: newSizes});
        res.json(product);
    }
    catch(error){
        res.send(error);
    }
};

exports.addTagsToProduct = async function(req, res){
    try{
        let product = await Product.findOne({_id: req.body.id});
        let newTags = await addReferences(product.tags,req.body.tags,res);
        product = await Product.findOneAndUpdate({_id: req.post.id}, {tags: newTags});
        res.json(product);
    }
    catch(error){
        res.send(error);
    }
};

exports.productViewed = async function(req, res){
    try{
        let viewedProduct = await Product.findOneAndUpdate({_id: req.body.id}, { $inc: { viewed_times: 1}});
        res.json(viewedProduct);
    }
    catch(error){
        res.send(error);
    }
};

exports.disableProduct = async function(req, res){
    try{
        let disableProduct = await Product.findOneAndUpdate({_id: req.body.id}, {active: false});
        res.json(disableProduct);
    }
    catch(error){
        res.send(error);
    }
};

exports.updateImage = async function(req, res){
    try{
        let updatedProduct = await Product.findOneAndUpdate({_id: req.body.id}, { image: req.body.image});
        res.json(updatedProduct);
    }
    catch(error){
        res.send(error);
    }
};

exports.activateProduct = async function(req, res){
    try{
        let activeProduct = await Product.findOneAndUpdate({_id: req.body.id}, { active : true});
        res.json(activeProduct);
    }
    catch(error){
        res.send(error);
    }
};