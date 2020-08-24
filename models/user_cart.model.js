'use strict';

// Importing required modules.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the schema for our User Cart database model.
let userCartSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AuthUser'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true })

// Exporting the Schema Model.
module.exports = mongoose.model('UserCart', userCartSchema);