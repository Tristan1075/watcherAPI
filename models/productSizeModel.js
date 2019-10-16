const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var product_sizeSchema = new Schema({
    id_product:{
        type: Number,
        required: true
    },
    id_size:{
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('product_size', product_sizeSchema);
