'use strict';

// Importing required modules.
const categoryController = require('../controllers/category.controller');
const userMiddleware = require('../middlewares/user.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');


/****************************************************
 * Routes for the categories.                       *
 ****************************************************/
const categoryRoutes = (expressApp , categoryRoutes) => {
    categoryRoutes.post('/create_category', expressApp.oauth.authorise(), userMiddleware.checkAdmin, categoryMiddleware.checkCategoryByName, categoryController.create_category);
    return categoryRoutes;
};


// Exporting category routes.
module.exports = categoryRoutes;