const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.set('useCreateIndex', true);
require('dotenv').config();

const app = express();


const hostname = process.env.HOST;
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;


var mongodb = 'mongodb+srv://default:default@watcher-13drk.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongodb, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const userAddressRoutes = require('./routes/userAddressRoutes');

userRoutes(app);
productRoutes(app);
userAddressRoutes(app);

app.listen(port, () => {
    console.log('App listening on port ' + port);
});