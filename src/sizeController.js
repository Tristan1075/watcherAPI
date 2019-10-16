Size = require('../models/sizeModel');

exports.getAllSize = function(req, res){
    Size.find({}, function (err, size){
        if(err){
            res.send(err);
        }
        else{
            res.json(size)
        }
    });
};

exports.getSize = function(req, res){
    Size.find({_id: req.body.id}, function(err, size){
        if(err){
            res.send(err);
        }
        else{
            res.json(size);
        }
    });
};

exports.createSize = function(req, res){
    var newSize = new Size(req.body);
    newSize.save(function(err, size){
        if(err){
            res.send(err);
        }
        else{
            res.json(size);
        }
    });
};