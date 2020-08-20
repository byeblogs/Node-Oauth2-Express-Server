'use strict';

// Importing required modules.
const bcrypt = require('bcrypt');
const userModel = require('../models/auth_user.model');

/****************************************************
 * Checks user is laready registered or not.        *
 ****************************************************/
const checkUserAlreadyExist = async (req,res,next) => {
    var username = req['body']['username'];
    await userModel.find({username:username},(error,foundUser)=>{
        if(error) return res.status(400).json({status:400 , message:"check your username" , error:error});
        if(foundUser['length'] > 0) return res.status(401).json({status:401 , message:"username already registered"});
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
                next();
            }
        })
    }
}
/****************************************END*************************************/

 return module.exports = {

    checkUserAlreadyExist:checkUserAlreadyExist,
    encryptPassword:encryptPassword
 };