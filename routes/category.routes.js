'use strict';

// Importing required modules.
const categoryController = require('../controllers/category.controller');
const userMiddleware = require ('../middlewares/user.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');

const oAuth2Server = require('node-oauth2-server');
const authModel = require('../authorization/model');
const express = require('express');
const categoryRoutes = express.Router();
var app = express();

// Initializes Outh2Server using express.
app.oauth = oAuth2Server({
    model: authModel,
    grants: ['password'],
    debug: true
});
app.use(app.oauth.errorHandler());

/****************************************************
 * Routes for the categories.                       *
 ****************************************************/
categoryRoutes.post('/create_category', app.oauth.authorise(), userMiddleware.checkAdmin, categoryMiddleware.checkCategoryByName , categoryController.create_category);

// Exporting category routes.
module.exports = categoryRoutes;