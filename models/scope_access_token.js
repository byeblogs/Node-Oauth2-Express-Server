'use strict';

// Importing required modules.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the schema for our Scope database model.
let scopeSchema = new Schema({
    scopeNumber: {
        type: String,
        required: true,
        ref: 'AccessToken'
    },
    permissions: [],
}, { timestamps: true })

// Exporting the Schema Model.
module.exports = mongoose.model('Scope', scopeSchema);