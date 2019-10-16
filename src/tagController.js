Tag = require('../models/tagsModel');

exports.getAllTags = function (req, res){
    Tag.find({}, function (err, tag){
        if(err){
            res.send(err);
        }
        else{
            res.json(tag);
        }
    });
};

exports.getTag = function(req, res){
    Tag.find({_id: req.params.tagId}, function(err, tag){
        if(err){
            res.send(err);
        }
        else{
            res.json(tag);
        }
    });
};

exports.createTag = function(req, res){
    var newTag = new Tag(req.body);
    newTag.save(function(err, tag){
        if(err){
            res.send(err);
        }
        else{
            res.json(tag);
        }
    });
};