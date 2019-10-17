const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var strapImageModel = new Schema({
    link:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Strap_image', strapImageModel);
