'use strict';

// Importing required modules.
const authUserModel = require('../models/auth_user.model');
const decryptPassHelper = require('../helpers/decrypt_password');


/****************************************************
 * Checks whether user record is there or not in db.*
 ****************************************************/
const findUser = (username) => {
    var username = username;
    return new Promise((resolve, reject) => {
        try {
            authUserModel.find({ username: username }, (error, found) => {
                if (error) reject(error);
                else if (found.length === 1) return resolve(found[0]['_doc']);
                else return resolve("false");
            })
        } catch (error) {
            reject(error);
        }
    });
};
/****************************************END*************************************/


/****************************************************
 * Registers the user in db.                         *
 ****************************************************/
const createUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        try {
            userDetails.save(userDetails, (error, createdUser) => {
                if (error) reject(error);
                else resolve(createdUser['_doc']);
            })
        } catch (error) {
            reject(error);
        }
    });
};
/****************************************END*************************************/


/****************************************************
 * Checks the user is Admin or not.                 *
 ****************************************************/
const isAdmin = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            authUserModel.find({ _id: userId }, (error, found) => {
                if (error) reject(error);
                if (found.length === 1) {
                    const isAdmin = found[0]['isAdmin'];
                    if (isAdmin) resolve(true);
                    else resolve(false);
                }
                else reject("not user");
            });
        } catch (error) {
            reject(error);
        }
    });
};
/****************************************END*************************************/


/****************************************************
 * Checks user using username , password            *
 ****************************************************/
const checkUserFromCredentials = (username, password) => {
    return new Promise((resolve, reject) => {
        try {
            findUser(username)
                .then(async (userDetails) => {
                    if (userDetails === "false") resolve("false");
                    else return await decryptPassHelper.decrypt_password(password, userDetails['password'])
                        .then((decrypted_password) => {
                            if (decrypted_password) resolve(userDetails);
                            else resolve("false");
                        }).catch((err) => {
                            reject("false");
                        });
                })
                .catch((err) => {
                    reject("false");
                });
        } catch (error) {
            reject(error);
        }
    });
};
/****************************************END*************************************/


// Exporting user helper
return module.exports = {

    findUser:findUser,
    createUser:createUser,
    isAdmin:isAdmin,
    checkUserFromCredentials:checkUserFromCredentials
    
};
/****************************************END*************************************/