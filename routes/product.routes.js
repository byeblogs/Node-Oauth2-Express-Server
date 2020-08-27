'use strict';

// Importing required modules.
const userMiddleware = require('../middlewares/user.middleware');
const productController = require('../controllers/product.controller');
const scopeMiddleware = require('../middlewares/scope.middleware');
const productMiddleware = require('../middlewares/product.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');


/****************************************************
 * Routes for the products.                         *
 ****************************************************/
const productRoutes = (expressApp , productRoutes) => {
    productRoutes.post('/create_product', expressApp.oauth.authorise(), userMiddleware.checkAdmin, productMiddleware.checkProductByName, categoryMiddleware.checkCategoryById, productController.create_product);
    productRoutes.delete('/delete_product', expressApp.oauth.authorise(), userMiddleware.checkAdmin, productController.delete_product);
    productRoutes.get('/getProductByProductId', expressApp.oauth.authorise(), scopeMiddleware.scopeCheck, productController.getProductByProductId);
    return productRoutes;
};


// Exporting product routes.
module.exports = productRoutes;