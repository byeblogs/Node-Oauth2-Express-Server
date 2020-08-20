'use strict';

// Importing required modules.
const bcrypt = require('bcrypt');


/****************************************************
 * Decrypt the password.                             *
 ****************************************************/
exports.decrypt_password = (password, encrypted_pass) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(password, encrypted_pass, (error, decryt_result) => {
                if (error) reject(error);
                else resolve(decryt_result);
            });
        } catch (error) {
            reject(error);
        }
    })
}
/****************************************END*************************************/