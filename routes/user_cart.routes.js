'use strict';

// Importing required modules.
const checkProductMiddleware = require('../middlewares/checkProductInUserCart');
const userCartController = require('../controllers/user_cart.controller');
const checkScopeMiddleware = require('../middlewares/checkScope');
const checkProductValidMiddleware = require('../middlewares/checkProductInDb');
const tokenAndUserMiddleware = require('../middlewares/checkTokenAndUserId');

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
userCartRoutes.post('/addProductToUserCart', app.oauth.authorise(), tokenAndUserMiddleware.checkTokenAndUserId, checkScopeMiddleware.scopeCheck, checkProductMiddleware.checkProductInUserCart,checkProductValidMiddleware.checkProductIsValidByProductId, userCartController.addProductToUserCart);
userCartRoutes.delete('/deleteProductFromUserCart', app.oauth.authorise(), checkScopeMiddleware.scopeCheck, userCartController.deleteProductFromUserCart);
userCartRoutes.get('/getAllProductOfUserByUserId', app.oauth.authorise(), userCartController.getAllProductOfUserByUserId);

// Exporting user cart routes.
module.exports = userCartRoutes;