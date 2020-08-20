'use strict';

// Importing required modules.
const accessTokenModel = require('../models/access_token.model');
const authUserModel = require('../models/auth_user.model');
let requestCustom;
exports.setScope = (req, res, next) => {

    requestCustom = req;
    next();
}


/****************************************************
 * Save token of the Login user.                    *
 * By default scope of the token is "A"             *
 ****************************************************/
exports.saveToken = (accessToken, userId) => {
    var scope = requestCustom['query']['scope'];
    var scope = scope ? scope.toUpperCase() : "A";
    let accessTokenObj = new accessTokenModel({
        userId: userId,
        token: accessToken,
        scope: scope
    });
    return new Promise((resolve, reject) => {
        try {
            accessTokenObj.save(accessTokenObj, (error, insertedToken) => {
                if (error) reject(error);
                else resolve();
            });
        } catch (error) {
            reject(error);
        }
    })
}
/****************************************END*************************************/


/****************************************************
 * Checks token is saved in db or not.              *
 ****************************************************/
exports.checkTokenInDB = (accessToken) => {
    return new Promise((resolve, reject) => {
        try {
            accessTokenModel.find({ token: accessToken })
                .populate('userId')
                .exec((error, foundToken) => {
                    if (error) reject(error);
                    else if (foundToken.length === 1) resolve(foundToken[0]);
                    else resolve(null);
                });
        } catch (error) {
            reject(error);
        }
    })
}
/****************************************END*************************************/