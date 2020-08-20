'use strict';

// Importing required modules.
const bcrypt = require('bcrypt');
const userModel = require('../models/auth_user.model');


/****************************************************
 * Checks user is already registered or not.        *
 ****************************************************/
const checkUserAlreadyExist = async (req, res, next) => {
    var username = req['body']['username'];
    await userModel.find({ username: username }, (error, foundUser) => {
        if (error) return res.status(400).json({ status: 400, message: "check your username", error: error });
        if (foundUser['length'] > 0) return res.status(401).json({ status: 401, message: "username already registered" });
        else return next();
    });
};
/****************************************END*************************************/


/****************************************************
 * Encrypts the user password.                      *
 ****************************************************/
const encryptPassword = async (req, res, next) => {
    var username = req['body']['username'];
    var password = req['body']['password'];
    var phone = req['body']['phone'];
    if (!username || !password || !phone) {
        return res.json({ status: 404, msg: "all fields are required" });
    }
    else {
        await bcrypt.hash(password, 0, (error, encrypted_pass) => {
            if (error) return res.json({ status: 404, msg: "Something went wrong" });
            else {
                req.body.password = encrypted_pass;
                return next();
            }
        })
    }
}
/****************************************END*************************************/


/****************************************************
 * Checks the user is admin or not.                 *
 ****************************************************/
const checkAdmin = async (req, res, next) => {
    var userIsValid = req['user'].get('id');
    var isAdmin = req['user'].get('isAdmin');
    if (!isAdmin) return res.status(404).json({ status: 404, message: "You are not authorized to call this API" });
    else if (userIsValid == undefined || userIsValid == null) return res.status(404).json({ status: 404, message: "User not found" });
    else {
        return next();
    }
}
/****************************************END*************************************/


/****************************************************
 * Checks token and userId is same or not.          *
 ****************************************************/
const checkTokenAndUserId = (req, res, next) => {
    try {
        const id = req['user'].get('id');
        const userId = req['body']['userId'];
        if (id !== userId) return res.status(404).json({ status: 404, message: "This user is not authorized with the token" });
        else if (id == userId) return next();
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


// Exporting User Middleware.
return module.exports = {

    checkUserAlreadyExist: checkUserAlreadyExist,
    encryptPassword: encryptPassword,
    checkAdmin: checkAdmin,
    checkTokenAndUserId: checkTokenAndUserId

};
/****************************************END*************************************/