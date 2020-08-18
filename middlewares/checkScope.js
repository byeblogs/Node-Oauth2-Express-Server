'use strict';

// Importing required modules.
const accessTokenModel = require('../models/access_token.model');
const scopeModel = require('../models/scope_access_token');

/****************************************************
 * Checks the scope of the access-token.            *
 ****************************************************/
exports.scopeCheck = async (req, res, next) => {
    try {
        const urlCreate = `${req['method']} ${req['protocol']}://${req['headers']['host']}${req['originalUrl']}`;
        const url = urlCreate.split('?')[0].toLowerCase();
        const token = req['headers']['authorization'].split('Bearer ')[1];
        console.log(token);
        await accessTokenModel.find({ token: token }, (error, foundToken) => {
            if (error) return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
            else if (foundToken.length === 1) {
                const scope = foundToken[0]['scope'];

                /** checks permission to the scope.
                 * @param permission will get the array of urls that can be accessed with this scope number.
                 * And then checks whether the called endpoint is in the array of urls or not.
                 * If yes then scope haas the permission of the endpoint otherwise not.
                 */
                this.getScopesByScopeNumber(scope, res, (permissions) => {
                    for (var i = 0; i < permissions['length']; i++) {
                        if (permissions[i] == url) {
                            return next();
                        }
                        else continue;
                    }
                    return res.status(404).json({ status: 404, message: "Your access-token do not have access to this API." })
                });
            }
        })
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


/****************************************************
 * Gets the scope permission from db.               *
 ****************************************************/
exports.getScopesByScopeNumber = async (scopeNumber, res, cb) => {
    try {
        await scopeModel.find({ scopeNumber: scopeNumber }, (error, foundScope) => {
            if (error) return res.status(401).json({ status: 401, message: "Error in getting acces-token scope permission.", error: error });
            else if (foundScope.length === 1) return cb(foundScope[0]['permissions']);
            else return res.status(401).json({ status: 401, message: "Cannot find the access-token scope permissions." });
        });
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Error in finding", error: error });
    }
}
/****************************************END*************************************/