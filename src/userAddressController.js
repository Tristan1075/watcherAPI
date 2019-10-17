User = require('../models/userModel');
UserAddress = require('../models/userAddressModel');
const config = require('../config/secrets');

exports.add_address = async function(req, res){
    try{
        var address = new UserAddress(req.body);
        var newAddress = await address.save();
        res.json(newAddress);
    }
    catch(error){
        res.send(error);
    }
};

exports.get_all_address = async function(req, res) {
    try{
        var addresses = await UserAddress.find({});
        res.json(addresses);
    }
    catch(error){
        res.send(error);
    }
};

exports.get_address_by_user = async function(req, res) {
    try{
        var address = await UserAddress.find({id_user: req.params.id_user});
        res.json(address);
    }
    catch(error){
        res.send(error);
    }
};

exports.update_address = async function(req, res) {
    try{
        var address = await UserAddress.findOne({_id: req.params.id});
        address.street = req.body.street;
        address.city = req.body.city;
        address.country = req.body.country;
        address.save();
        res.json(address)
    }
    catch(error){
        res.send(error);
    }
};

exports.delete_address = async function(req, res) {
    try{
        var address = await UserAddress.findOne({_id: req.params.id});
        address.remove();
        res.json('success');
    }
    catch(error){
        res.send(error);
    }
};
