Size = require('../models/sizeModel');

exports.getAllSize = async function(req, res){
    try{
        var sizes = await Size.find({});
        res.send(sizes);
    }
    catch(error){
        res.send(error);
    }
};

exports.getSize = async function(req, res){
    try{
        var size = await Size.find({_id: req.params.sizeId});
        res.send(size);
    }
    catch(error){
        res.send(error);
    }
};

exports.createSize = async function(req, res){
    try{
        var newSize = await new Size(req.body).save();
        res.send(newSize);
    }
    catch(error){
        res.send(error);
    }
};

exports.updateOrder = async function(req, res){
    try{
        var updatedSize = await Size.findOneAndUpdate({_id: req.body.id}, { order: req.body.order });
        res.send(updatedSize);
    }
    catch(error){
        res.send(error);
    }
}