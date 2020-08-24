'use strict';

// Importing required modules.
const userHelper = require('../helpers/user_methods');
const accessTokenHelper = require('../helpers/access-token');
const express = require('express');
var app = express();


/****************************************************
 * Check client_Id and secret_Id.                     *
 ****************************************************/
function getClient(clientID, clientSecret, callback) {
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null
    }

    callback(false, client);
}
/****************************************END*************************************/


/****************************************************
 * Check grant type.                                *
 ****************************************************/
function grantTypeAllowed(clientID, grantType, callback) {

    callback(false, true);
}
/****************************************END*************************************/


/****************************************************
 * Check User.                                      *
 ****************************************************/
function getUser(username, password, callback) {

    //try and get the user using the user's credentials
    userHelper.checkUserFromCredentials(username, password)
        .then((isCorrect) => {
            if (isCorrect === "false") callback(false, null);
            else callback(false, isCorrect);
        })
        .catch(error => callback(error, null))
}
/****************************************END*************************************/


/****************************************************
 * Create token if the user is valid User.          *
 ****************************************************/
function saveAccessToken(accessToken, clientID, expires, user, callback) {

    //save the accessToken along with the user.id
    accessTokenHelper.saveToken(accessToken, user['_id'])
        .then(() => callback(null))
        .catch(error => callback(error))
}
/****************************************END*************************************/


/****************************************************
 * Check for the user token in Header.              *
 ****************************************************/
function getAccessToken(bearerToken, callback) {
    //try and get the userID from the db using the bearerToken
    accessTokenHelper.checkTokenInDB(bearerToken)
        .then((userDetails) => {
            if (userDetails == null) callback(false, null);
            else {
                const accessToken = {
                    user: userDetails.get('userId'),
                    token: userDetails,
                    expires: null
                }
                callback(false, accessToken);
            }
        }).catch((err) => {
            callback(true, null);
        });
}
/****************************************END*************************************/

// Exporting module.
return module.exports = {

    getClient: getClient,

    grantTypeAllowed: grantTypeAllowed,

    getUser: getUser,

    saveAccessToken: saveAccessToken,

    getAccessToken: getAccessToken
}
/****************************************END*************************************/;