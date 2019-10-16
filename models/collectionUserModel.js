const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var collection_userSchema = new Schema({
    id_user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    id_collection: {
        type: Number,
        required: true
    },
    viewed_times:{
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('collection_user', collection_userSchema);
