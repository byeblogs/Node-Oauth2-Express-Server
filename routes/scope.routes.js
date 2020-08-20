'use strict';

// Importing required modules.
const scopeController = require('../controllers/scope.controller');
const userMiddleware = require('../middlewares/user.middleware');
const scopeMiddleware = require('../middlewares/scope.middleware');
const oAuth2Server = require('node-oauth2-server');
const authModel = require('../authorization/model');
const express = require('express');
const scopeRoutes = express.Router();
var app = express();

// Initializes Outh2Server using express.
app.oauth = oAuth2Server({
    model: authModel,
    grants: ['password'],
    debug: true
});
app.use(app.oauth.errorHandler());

/****************************************************
 * Routes for the scopes.                           *
 ****************************************************/
scopeRoutes.post('/addScope', app.oauth.authorise(), userMiddleware.checkAdmin, scopeMiddleware.isScopeFieldsValid, scopeController.addScope);

// Exporting scope routes.
module.exports = scopeRoutes;