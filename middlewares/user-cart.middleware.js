'user strict';

// Importing required modules.
const userCartModel = require('../models/user_cart.model');


/****************************************************
 * Checks the product is already in usercart or not.*
 ****************************************************/
const checkProductInUserCart = async (req, res, next) => {
    try {
        var userId = req['body']['userId'];
        var product_id = req['body']['product_id'];
        if (!userId || !product_id)
            return res.status(201).json({ status: 201, message: "All fields are required" });
        else {
            await userCartModel.find({ userId: userId, product_id: product_id }, (error, foundUserCart) => {
                if (error) return res.status(400).json({ status: 400, message: "Check your product id.", error: error });
                else if (foundUserCart.length === 1) return res.status(201).json({ status: 201, message: "This product already exist in your cart" });
                else {
                    return next();
                }
            })
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


// Exporting User-Cart Middleware.
return module.exports = {

    checkProductInUserCart: checkProductInUserCart

}
/****************************************END*************************************/
