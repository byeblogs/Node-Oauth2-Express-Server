'use strict';

// Importing required modules.
const authUserController = require('../controllers/auth_user.controller');
const enc_pass_middleware = require('../middlewares/encrypt_password');
const customMiddleware = require('../helpers/access-token');
const express = require('express');
const authRoutes = express.Router();
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
 * Routes for the auth.                             *
 ****************************************************/
authRoutes.post('/register', app.use(enc_pass_middleware.encryptPassword), authUserController.register);
authRoutes.post('/login',customMiddleware.setScope, app.oauth.grant());

// Exporting auth user routes.
module.exports = authRoutes;
