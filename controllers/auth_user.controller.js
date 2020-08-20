'use strict'

// Importing required modules.
const authUserModel = require('../models/auth_user.model');


/****************************************************
 * Register user  API.                              *
 ****************************************************/
exports.register = async (req, res) => {
    try {
        var username = req['body']['username'];
        var password = req['body']['password'];
        var phone = req['body']['phone'];
        var isAdmin = req['body']['isAdmin'] ? req['body']['isAdmin'] : false;

        // creating user object to insert.
        var userModelObj = new authUserModel({
            username: username,
            password: password,
            phone: phone,
            isAdmin: isAdmin
        });
        userModelObj.save(userModelObj, (error, createdUser) => {
            if (error) return res.status(401).json({ status: 401, message: "Check all your fields", error: error });
            else if (!createdUser['id']) return res.status(401).json({ status: 401, message: "User registration unsuccesssfull", data: createdUser });
            else return res.status(200).json({ status: 401, message: "User registered", data: createdUser });
        });
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/