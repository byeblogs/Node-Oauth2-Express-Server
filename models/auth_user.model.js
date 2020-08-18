'use strict';

// Importing required modules.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the schema for our Auth User database model.
let authUserSchema = new Schema({

    username: {
        type: String,
        required: true,
        max: 100
    },
    password: {
        type: String,
        required: true,
        max: 25
    },
    phone: {
        type: Number,
        required: false,
        maxlength: 10
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

// Exporting the Schema Model.
module.exports = mongoose.model('AuthUser', authUserSchema);