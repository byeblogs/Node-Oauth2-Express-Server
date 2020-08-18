'use strict';

// Importing required modules.
const mongoose = require('mongoose');

// Connecting to the mongodb and creating the database.
mongoose.connect('mongodb://localhost:27017/ProductCZ_2', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('DB connected succcessfully');
    }
    else {
        console.log("error: " + err)
    }
});

// Importing the Auth User Model.
require('./auth_user.model');