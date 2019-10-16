const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    id_stripe: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Users', userSchema);

/*
Possible var :
default: "Unknown"
type : String, Boolean, Number, Date (Date.now)
 */