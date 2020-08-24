'use strict';

// Importing required modules.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating the schema for our Product database model.
let productSchema = new Schema({

    product_name: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_category_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
}, { timestamps: true })

// Exporting the Schema Model.
module.exports = mongoose.model('Product', productSchema);