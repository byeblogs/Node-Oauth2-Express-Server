'use strict';

// Importing required modules.
const userCartModel = require('../models/user_cart.model');


/****************************************************
 * Add Product in user cart API.                    *
 ****************************************************/
exports.addProductToUserCart = (req, res) => {
    try {
        var userId = req['body']['userId'];
        var product_id = req['body']['product_id'];
        const userCartObj = new userCartModel({
            userId: userId,
            product_id: product_id
        });
        userCartObj.save(userCartObj, (error, createdUserCart) => {
            if (error) return res.status(401).json({ status: 401, message: "Check your post data", error: error });
            else return res.status(200).json({ status: 200, message: "Added Successfully", data: createdUserCart['_doc'] });
        });
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


/****************************************************
 * Delete Product from user cart API.               *
 ****************************************************/
exports.deleteProductFromUserCart = (req, res) => {
    try {
        const product_id = req['query']['productId'];
        const userId = req['query']['userId'];
        if (!product_id || !userId)
            return res.status(201).json({ status: 201, message: "Check your productId and UserId" });
        else {
            userCartModel.remove({ userId: userId, product_id: product_id }, (error, deletedUserCart) => {
                if (error) return res.status(401).json({ status: 401, message: "Check your productId and UserId", error: error });
                else if (deletedUserCart['deletedCount'] == 0) return res.status(401).json({ status: 401, message: "check your productId and userId" });
                else return res.status(200).json({ status: 200, message: "Product has been deleted successfuly from your cart." });
            });
        }
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


/****************************************************
 * Get All Product in user cart API.                *
 ****************************************************/
exports.getAllProductOfUserByUserId = (req, res) => {
    try {
        const userId = req['query']['id'];
        if (!userId)
            return res.status(201).json({ status: 201, message: "User id not found" });
        else {
            userCartModel.find({ userId: userId }).
                populate('userId').
                exec((error, foundAllCarts) => {
                    if (error) return res.status(401).json({ status: 401, message: "Check your user id", error: error });
                    else if (foundAllCarts.length > 0) return res.status(200).json({ status: 200, data: foundAllCarts });
                    else return res.status(200).json({ status: 200, message: "Your cart is empty", data: foundAllCarts });
                })
        }
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/