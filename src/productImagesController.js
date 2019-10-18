Strap_image = require('../models/strapImageModel');
Face_image = require('../models/faceImageModel');
Case_image = require('../models/caseImageModel');
CustomWatch = require('../models/customWatchModel');
let fs = require('fs');
let request = require('request');
var rp = require('request-promise');
let images = require('images');

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
            datas[0] = images;
        }
    });
    let faceImages = await Face_image.find({}, function (err, images) {
        if(err) {
            res.send(err);
        }
        else {
            datas[1] = images;
        }
    });
    let caseImages = await Case_image.find({}, function (err, images) {
        if(err) {
            res.send(err);
        }
        else {
            datas[2] = images;
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
    let customStrap = await getImageLink("strap", newWatch.images[0]);
    let customFace = await getImageLink("face", newWatch.images[1]);
    let customCase = await getImageLink("case", newWatch.images[2]);

    /*console.log("customStrap.link : " + customStrap.link);
    console.log("customFace.link : " + customFace.link);
    console.log("customCase.link : " + customCase.link);*/
    await download(customStrap.link, 'images/bracelet.png', function(){
        console.log('strap downloaded');
    });
    await download(customFace.link, 'images/cadran.png', function(){
        console.log('face downloaded');
    });
    await download(customCase.link, 'images/boitier.png', function(){
        console.log('case downloaded');
    });

    try {
        console.log("try fusion images");
        if (fs.existsSync("images/bracelet.png"))  {
            if (fs.existsSync("images/cadran.png")) {
                if (fs.existsSync("images/boitier.png")) {
                    images("images/bracelet.png")
                        .draw(images("images/cadran.png"),0,0)
                        .draw(images("images/boitier.png"),0,0)
                        .save("images/custom_watch_" + newWatch.id_user + ".png", {quality: 50});
                }
            }
        }
        else {
            console.log("files arent downloaded yet");
        }

    } catch (e) {
        console.log("ERREUR FUSION : " + e.toString());
    }

    newWatch.save(function (err, watch) {
        if(err) {
            console.log(err);
            res.send(err);
        }
    });

    try {
        if (fs.existsSync("images/custom_watch_" + newWatch.id_user + ".png")) {
            fs.readFile("images/custom_watch_" + newWatch.id_user + ".png", function (err, content) {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200,{'Content-type':'image/png'});
                    res.end(content);
                }
            });
        }
    }catch (e) {
        console.log("ERROR send custom watch : " + e.toString());
    }
};

async function getImageLink(type, id) {
    switch (type) {
        case "strap":
            return Strap_image.findOne({_id: id});
            break;
        case "face":
            return Face_image.findOne({_id: id});
            break;
        case "case":
            return Case_image.findOne({_id: id});
            break;
        default:
            console.log("Unknown image type")
    }
}

let download = async function(uri, filename, callback){
    request.head(uri, async function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
    rp(uri)
        .then(function(body, data) {
            console.log("downloading " + filename + "...");
        })
};

exports.postImageToFusion = async function (req, res) {
    let newWatch = new CustomWatch(req.body);
    let customStrap = await getImageLink("strap", newWatch.images[0]);
    let customFace = await getImageLink("face", newWatch.images[1]);
    let customCase = await getImageLink("case", newWatch.images[2]);

    /*console.log("customStrap.link : " + customStrap.link);
    console.log("customFace.link : " + customFace.link);
    console.log("customCase.link : " + customCase.link);*/
    await download(customStrap.link, 'images/bracelet.png', function(){
        console.log('strap downloaded');
    });
    await download(customFace.link, 'images/cadran.png', function(){
        console.log('face downloaded');
    });
    await download(customCase.link, 'images/boitier.png', function(){
        console.log('case downloaded');
    });

    res.send("Images downloaded");
};

exports.fusionImages = async function(req, res) {
    try {
        console.log("try fusion images");
        images("images/bracelet.png")
            .draw(images("images/cadran.png"),0,0)
            .draw(images("images/boitier.png"),0,0)
            .save("images/custom_watch_.png", {quality: 50});

    } catch (e) {
        console.log("ERREUR FUSION : " + e.toString());
    }

    try {
        if (fs.existsSync("images/custom_watch_.png")) {
            fs.readFile("images/custom_watch_.png", function (err, content) {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200,{'Content-type':'image/png'});
                    res.end(content);
                }
            });
        }
    }catch (e) {
        console.log("ERROR send custom watch : " + e.toString());
    }
};
