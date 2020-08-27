'use strict';

// Importing required modules.
const userMiddleware = require('../middlewares/user.middleware');
const authUserController = require('../controllers/auth_user.controller');
const customMiddleware = require('../helpers/access-token');


/****************************************************
 * Routes for the auth.                             *
 ****************************************************/
const authRoutes = (expressApp , authRoutes) => {
    authRoutes.post('/register', userMiddleware.encryptPassword, userMiddleware.checkUserAlreadyExist, authUserController.register);
    authRoutes.post('/login', customMiddleware.setScope, expressApp.oauth.grant());
    return authRoutes;
};


// Exporting auth user routes.
module.exports = authRoutes;