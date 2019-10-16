const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var product_tagsSchema = new Schema({
    id_product:{
        type: Number,
        required: true
    },
    id_tag:{
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('product_tags', product_tagsSchema);
