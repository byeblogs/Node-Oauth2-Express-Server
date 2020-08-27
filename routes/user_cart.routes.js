'use strict';

// Importing required modules.
const productMiddleware = require('../middlewares/product.middleware');
const userCartController = require('../controllers/user_cart.controller');
const scopeMiddleware = require('../middlewares/scope.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const userCartMiddleware = require('../middlewares/user-cart.middleware')


/****************************************************
 * Routes for  the user cart.                       *
 ****************************************************/
const userCartRoutes = (expressApp , userCartRoutes) => {
    userCartRoutes.post('/addProductToUserCart', expressApp.oauth.authorise(), userMiddleware.checkTokenAndUserId, scopeMiddleware.scopeCheck, userCartMiddleware.checkProductInUserCart, productMiddleware.checkProductById, userCartController.addProductToUserCart);
    userCartRoutes.delete('/deleteProductFromUserCart', expressApp.oauth.authorise(), scopeMiddleware.scopeCheck, userCartController.deleteProductFromUserCart);
    userCartRoutes.get('/getAllProductOfUserByUserId', expressApp.oauth.authorise(), userCartController.getAllProductOfUserByUserId);
    return userCartRoutes;
};


// Exporting user cart routes.
module.exports = userCartRoutes;