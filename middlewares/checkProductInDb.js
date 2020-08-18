'use strict';

// Importing required modules.
const productModel = require('../models/product.model');

/****************************************************
 * Checks the product with this name is already     *    
 * registered or not.                               *
 ****************************************************/
exports.checkProduct = async (req, res, next) => {
    try {
        
        var product_name = req['body']['product_name'];
        var product_description = req['body']['product_description'];
        var product_price = req['body']['product_price'];
        var product_category_id = req['body']['product_category_id'];
        if (!product_name || !product_description || !product_price || !product_category_id
            || product_name == '' || product_description == '' || product_price == '' || product_category_id == '')
            return res.status(201).json({ status: 201, message: "All fields are required" });
        else {
            await productModel.find({ product_name: product_name }, (error, foundProduct) => {
                if (error) return res.status(400).json({ status: 400, message: "Something wents wrong", error: error });
                else if (foundProduct.length === 1) return res.status(201).json({ status: 201, message: "This Product name already exist." });
                else return next();
            });
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


/****************************************************
 * Checks the product with this id is already     *    
 * registered or not.                               *
 ****************************************************/
exports.checkProductIsValidByProductId = async (req, res, next) => {
    try {
        const product_id = req['body']['product_id'];
        await productModel.find({ _id: product_id }, (error, foundProduct) => {
                if (error) return res.status(400).json({ status: 400, message: "Check your product id.", error: error });
                else if (foundProduct.length === 1) return next();
                else return res.status(400).json({ status: 400, message: "Check your product id.", error: error });
            });
    } catch (error) {
        return res.status(400).json({ status: 400, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/