const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var orderProductSchema = new Schema({
    id_product:{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    id_order:{
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    }
});
module.exports = mongoose.model('orderProduct', orderProductSchema);
