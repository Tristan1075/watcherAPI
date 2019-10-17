const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var strapImageSchema = new Schema({
    link:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Strap_image', strapImageSchema);
