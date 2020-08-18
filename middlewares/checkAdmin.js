'use strict';

// Importing required modules.
const userHelper = require('../helpers/user_methods');

/****************************************************
 * Checks the user is admin or not.                 *
 ****************************************************/
exports.checkAdminOrNot = async (req, res, next) => {
    var id = req['user']['id'].toString();
    if (!id || id == "") return res.status(404).json({ status: 404, message: "user not valid" });
    else {
        await userHelper.isAdmin(id)
            .then((isAdmin) => {
                if (isAdmin) next();
                else return res.status(404).json({ status: 404, message: "You are not authorized to call this API" });
            }).catch((error) => {
                if (error !== "not user") return res.status(401).json({ status: 401, message: "Something wents wrong" });
                else return res.status(404).json({ status: 404, message: "User not found" });
            });
    }
}
/****************************************END*************************************/