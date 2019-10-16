const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var collectionSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number
    },
    active:{
        type: Boolean,
        required: true
    },
    description:{
        type: Text
    },
    viewed_times: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model('collection', collectionSchema);
