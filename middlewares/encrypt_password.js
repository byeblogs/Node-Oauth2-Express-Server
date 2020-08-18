'use strict';

// Importing required modules.
const bcrypt = require('bcrypt');

/****************************************************
 * Encrypts the user password.                      *
 ****************************************************/
exports.encryptPassword = async (req, res, next) => {
    
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
                next();
            }
        })
    }
}
/****************************************END*************************************/