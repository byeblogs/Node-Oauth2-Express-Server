'use strict';

// Importing required modules.
const userMiddleware = require ('../middlewares/user.middleware');
const productController = require('../controllers/product.controller');

const scopeMiddleware = require('../middlewares/scope.middleware');
const productMiddleware = require('../middlewares/product.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');

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
productRoutes.post('/create_product', app.oauth.authorise(), userMiddleware.checkAdmin, productMiddleware.checkProductByName, categoryMiddleware.checkCategoryById, productController.create_product);
productRoutes.delete('/delete_product', app.oauth.authorise(), userMiddleware.checkAdmin, productController.delete_product);
productRoutes.get('/getProductByProductId', app.oauth.authorise(), scopeMiddleware.scopeCheck, productController.getProductByProductId);

// Exporting product routes.
module.exports = productRoutes;