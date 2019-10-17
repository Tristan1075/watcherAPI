const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var caseImageModel = new Schema({
    link:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Case_image', caseImageModel);
