const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var product_sizeSchema = new Schema({
    id_product:{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    id_size:{
        type: Schema.Types.ObjectId,
        ref: 'size',
        required: true
    }
});
module.exports = mongoose.model('product_size', product_sizeSchema);
