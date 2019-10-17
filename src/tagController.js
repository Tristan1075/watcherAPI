Tag = require('../models/tagModel');

exports.getAllTags = async function (req, res){
    try{
        var tags = await Tag.find({});
        res.json(tags);
    }
    catch(error){
        res.send(error);
    }
};

exports.getTag = async function(req, res){
    try{
        var tag = await Tag.fin({_id: req.params.tagId});
        res.json(tag);
    }
    catch(error){
        res.send(error);
    }
};

exports.createTag = async function(req, res){
    try{
        var newTag = await new Tag(req.body).save();
        res.json(newTag);
    }
    catch(error){
        res.send(error);
    }
};