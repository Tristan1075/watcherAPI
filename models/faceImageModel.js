const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var faceImageModel = new Schema({
    link:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Face_image', faceImageModel);
