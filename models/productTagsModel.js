const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var product_tagsSchema = new Schema({
    id_product:{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    id_tag:{
        type: Schema.Types.ObjectId,
        ref: 'tags',
        required: true
    }
});
module.exports = mongoose.model('product_tags', product_tagsSchema);
