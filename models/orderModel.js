const mongoose = require('mongoose');

var Schema =  mongoose.Schema;
/*
State 0 pas payé
State 1 payé
State 2 envoyé
State 3 Terminé
State 4 Retour
State 5 Annulé
 */

var orderSchema = new Schema({
    id_user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    id_shipping:{
        type: Number,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    date_updated: {
        type: Date
    },
    id_stripe_payment:{
        type: String
    }
});
module.exports = mongoose.model('order', orderSchema);
