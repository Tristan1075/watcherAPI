const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var productSchema = new Schema({
    viewed_times: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }
});
module.exports = mongoose.model('product', productSchema);
