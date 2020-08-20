'use strict';

// Importing required modules.
const productModel = require('../models/product.model');


/****************************************************
 * Create product API.                              *
 ****************************************************/
exports.create_product = async (req, res) => {
    try {
        var product_name = req['body']['product_name'];
        var product_description = req['body']['product_description'];
        var product_price = req['body']['product_price'];
        var product_category_id = req['body']['product_category_id'];
        const productObj = new productModel({
            product_name: product_name,
            product_description: product_description,
            product_price: product_price,
            product_category_id: product_category_id,
        });
        productObj.save(productObj, (error, createdProduct) => {
            if (error) return res.status(401).json({ status: 401, message: "Error in creating", error: error });
            else return res.status(200).json({ status: 200, message: "Created Successfully", data: createdProduct });
        });
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


/****************************************************
 * Delete product API.                              *
 ****************************************************/
exports.delete_product = (req, res) => {
    try {
        const product_id = req['query']['id'];
        if (!product_id) return res.status(404).json({ status: 404, message: "Product id not found" });
        productModel.remove({ _id: product_id }, (error, deletedProduct) => {
            if (error) return res.status(401).json({ status: 401, message: "Check your product id", error: error });
            else if (deletedProduct['deletedCount'] == 0) return res.status(401).json({ status: 401, message: "Check your productId" });
            else return res.status(200).json({ status: 200, message: "Product has been deleted successfuly" });
        });
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


/****************************************************
 * Get product By Product id API.                   *
 ****************************************************/
exports.getProductByProductId = (req, res) => {
    try {
        const product_id = req['query']['id'];
        if (!product_id) return res.status(404).json({ status: 404, message: "Product id not found" });
        productModel.find({ _id: product_id }).populate('product_category_id').exec((error, foundProduct) => {
            if (error) return res.status(401).json({ status: 401, message: "Check your product id", error: error });
            else if (foundProduct['length'] === 1) return res.status(200).json({ status: 200, data: foundProduct[0] });
            else return res.status(201).json({ status: 201, message: "No product available with this Id." });
        });
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/
