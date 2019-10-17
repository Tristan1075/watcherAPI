const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var caseImageSchema = new Schema({
    link:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Case_image', caseImageSchema);
