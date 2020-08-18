'use strict';

// Importing required modules.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the schema for our Category database model.
let categorySchema = new Schema({

    category_name: {
        type: String,
        required: true,
        max: 100
    },
    category_description: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Exporting the Schema Model.
module.exports = mongoose.model('Category', categorySchema);