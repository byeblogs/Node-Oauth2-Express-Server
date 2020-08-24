'use strict';

// Importing required modules.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the schema for our Access Token database model.
let accessTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    scope: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AuthUser'
    },
}, { timestamps: true })

// Exporting the Schema Model.
module.exports = mongoose.model('AccessToken', accessTokenSchema);