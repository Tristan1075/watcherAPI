const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var tagsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
});
module.exports = mongoose.model('tags', tagsSchema);
