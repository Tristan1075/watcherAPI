const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var faceImageSchema = new Schema({
    link:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Face_image', faceImageSchema);
