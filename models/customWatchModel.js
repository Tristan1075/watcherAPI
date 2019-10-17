const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let customWatchSchema = new Schema({
    images:{
        type: Array,
        required: true
    },
    id_user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});
module.exports = mongoose.model('custom_watch', customWatchSchema);
