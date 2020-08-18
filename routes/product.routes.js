'use strict';

// Importing required modules.
const productController = require('../controllers/product.controller');
const checkAdminMiddleware = require('../middlewares/checkAdmin');
const checkScopeMiddleware = require('../middlewares/checkScope');
const checkProductMiddleware = require('../middlewares/checkProductInDb');
const checkCategoryMiddleware = require('../middlewares/checkCategoryInDb');

const express = require('express');
const productRoutes = express.Router();
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
 * Routes for the products.                         *
 ****************************************************/
productRoutes.post('/create_product', app.oauth.authorise(), checkAdminMiddleware.checkAdminOrNot, checkProductMiddleware.checkProduct, checkCategoryMiddleware.checkCategoryById, productController.create_product);
productRoutes.delete('/delete_product', app.oauth.authorise(), checkAdminMiddleware.checkAdminOrNot, productController.delete_product);
productRoutes.get('/getProductByProductId', app.oauth.authorise(), checkScopeMiddleware.scopeCheck, productController.getProductByProductId);

// Exporting product routes.
module.exports = productRoutes;