const jwt = require('jsonwebtoken');
const config = require('../config/secrets');
const fs = require('fs');
const randomHash = require('random-hash');

exports.verify_token = function(req, res, next){
    var auth = req.headers['authorization'];
    if(typeof auth !== 'undefined'){
        var date = Date.now();
        if(config.secrets.date+604800 >= date){
            jwt.verify(auth, config.secrets.jwt_key, (err, authData) => {
                if(err) res.sendStatus(403);
                next();
            });
        }else{
            var hash = randomHash.generateHash({ length: 128 });
            var data = "exports.secrets = {\n" +
                "    jwt_key : \""+hash+"\",\n" +
                "    date: "+date+"\n" +
                "};";
            fs.writeFile("config/secrets.js", data, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Secrets have been updated");
            });
            res.sendStatus(401);
        }
    }else{
        res.sendStatus(403);
    }

};