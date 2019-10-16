const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var sizeSchema = new Schema({
        name:{
            type: String,
            required: true
        },
});
module.exports = mongoose.model('size', sizeSchema);
