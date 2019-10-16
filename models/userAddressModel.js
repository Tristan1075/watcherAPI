const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var user_addressSchema = new Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
});
module.exports = mongoose.model('user_address', user_addressSchema);
