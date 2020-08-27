'use strict';

// Importing required modules.
const scopeController = require('../controllers/scope.controller');
const userMiddleware = require('../middlewares/user.middleware');
const scopeMiddleware = require('../middlewares/scope.middleware');


/****************************************************
 * Routes for the scopes.                           *
 ****************************************************/
const scopeRoutes = (expressApp , scopeRoutes) => {
    scopeRoutes.post('/addScope', expressApp.oauth.authorise(), userMiddleware.checkAdmin, scopeMiddleware.isScopeFieldsValid, scopeController.addScope);
    return scopeRoutes;
};


// Exporting scope routes.
module.exports = scopeRoutes;