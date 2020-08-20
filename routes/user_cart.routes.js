'use strict';

// Importing required modules.
const productMiddleware = require('../middlewares/product.middleware');
const userCartController = require('../controllers/user_cart.controller');
const scopeMiddleware = require('../middlewares/scope.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const userCartMiddleware = require('../middlewares/user-cart.middleware')
const express = require('express');
const userCartRoutes = express.Router();
const oAuth2Server = require('node-oauth2-server');
const authModel = require('../authorization/model');
var app = express();

// Initializes Outh2Server using express.
app.oauth = oAuth2Server({
    model: authModel,
    grants: ['password'],
    debug: true
});
app.use(app.oauth.errorHandler());

/****************************************************
 * Routes for  the user cart.                       *
 ****************************************************/
userCartRoutes.post('/addProductToUserCart', app.oauth.authorise(), userMiddleware.checkTokenAndUserId, scopeMiddleware.scopeCheck, userCartMiddleware.checkProductInUserCart,productMiddleware.checkProductById, userCartController.addProductToUserCart);
userCartRoutes.delete('/deleteProductFromUserCart', app.oauth.authorise(), scopeMiddleware.scopeCheck, userCartController.deleteProductFromUserCart);
userCartRoutes.get('/getAllProductOfUserByUserId', app.oauth.authorise(), userCartController.getAllProductOfUserByUserId);

// Exporting user cart routes.
module.exports = userCartRoutes;