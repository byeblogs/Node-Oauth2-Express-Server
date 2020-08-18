'use strict'

// Importing required modules.
const authUserModel = require('../models/auth_user.model');
const userHelper = require('../helpers/user_methods');
const decryptPassHelper = require('../helpers/decrypt_password');

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

        // checks whether the email is already registered or not.
        await userHelper.findUser(username)
            .then(async (userDetails) => {
                if (userDetails !== "false") return res.status(201).json({ status: 201, message: "Username already exists" });
                // If not registered then create.
                else return await userHelper.createUser(userModelObj)
                    .then((createdUser) => {
                        return res.status(200).json({ status: 201, message: "Registered Successfully", data: createdUser });
                    })
                    .catch((err) => {
                        return res.status(401).json({ status: 401, message: "Something wents wrong", error: err });
                    });
            })
            .catch((err) => {
                return res.status(401).json({ status: 401, message: "Something wents wrong", error: err });
            });
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: err });
    }
}
/****************************************END*************************************/