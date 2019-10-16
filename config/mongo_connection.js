'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = async () => {
    const dev_connection = mongoose.connect('mongodb+srv://default:default@watcher-13drk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
    dev_connection
        .then(
            db => {
                console.log("Successfully logged to database");
                return db;
            }
        );

    return dev_connection;
};
