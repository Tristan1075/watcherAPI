const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var productCollectionSchema = new Schema({
    id_product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    id_collection:{
        type: Schema.Types.ObjectId,
        ref: 'collection',
        required: true
    }
});
module.exports = mongoose.model('productCollection', productCollectionSchema);
