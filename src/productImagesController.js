Strap_image = require('../models/strapImageModel');
Face_image = require('../models/faceImageModel');
Case_image = require('../models/caseImageModel');
CustomWatch = require('../models/customWatchModel');

exports.getAllImages = async function(req, res) {
    var datas = [
        [],
        [],
        []
    ];
    let strapImages = await Strap_image.find({}, function (err, images) {
        if(err) {
            res.send(err);
        }
        else {
            datas[0].push(images);
        }
    });
    let faceImages = await Face_image.find({}, function (err, images) {
        if(err) {
            res.send(err);
        }
        else {
            datas[1].push(images);
        }
    });
    let caseImages = await Case_image.find({}, function (err, images) {
        if(err) {
            res.send(err);
        }
        else {
            datas[2].push(images);
        }
    });
    res.json(datas);
};

exports.postImageStrap = async function (req, res) {
    let image = new Strap_image(req.body);
    image.save(function (err, image) {
        if(err) {
            res.send(err);
        }else {
            res.json(image);
        }
    });
};

exports.postImageFace = async function (req, res) {
    let image = new Face_image(req.body);
    image.save(function (err, image) {
        if(err) {
            res.send(err);
        }else {
            res.json(image);
        }
    });
};

exports.postImageCase = async function (req, res) {
    let image = new Case_image(req.body);
    image.save(function (err, image) {
        if(err) {
            res.send(err);
        }else {
            res.json(image);
        }
    });
};

exports.postCustomWatch = async function (req, res) {
    let newWatch = new CustomWatch(req.body);
    newWatch.save(function (err, watch) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(watch);
        }
    });
};
