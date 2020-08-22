'use strict';

// Importing required modules.
const accessTokenModel = require('../models/access_token.model');
const scopeModel = require('../models/scope_access_token');


/****************************************************
 * Checks the scope of the access-token.            *
 ****************************************************/
const scopeCheck = async (req, res, next) => {
    
    try {
        const method = req['method'];
        const protocol = req['protocol'];
        const host = req['headers']['host'];
        const apiUrl = req['originalUrl'];

        const urlCreate = `${method} ${protocol}://${host}${apiUrl}`;
        const url = urlCreate.split('?')[0].toLowerCase();
        const scopeNumber = req['oauth']['bearerToken']['token'].get('scope')
        getScopesByScopeNumber(scopeNumber, res, (permissions) => {
            for (var i = 0; i < permissions['length']; i++) {
                if (permissions[i] == url) {
                    return next();
                }
                else continue;
            }
            return res.status(404).json({ status: 404, message: "Your access-token do not have access to this API." })
        });
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/


/****************************************************
 * Gets the scope permission from db.               *
 ****************************************************/
const getScopesByScopeNumber = async (scopeNumber, res, cb) => {
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


/****************************************************
 * Checks the scope permissions is valid or not.               *
 ****************************************************/
const isScopeFieldsValid = async (req, res, next) => {
    try {
        var scope = req['body']['scopeNumber'].toUpperCase();
        var permissions = req['body']['permissions'];
        var isArray = permissions instanceof Array;
        if (!isArray) {
            permissions = [permissions];
        }
        var permissionsLength = permissions['length'];
        if (!scope || !permissions || permissionsLength == 0)
            return res.status(401).json({ status: 401, message: "All fields are required" });
        else {
            var custom = [];
            for (var i = 0; i < permissionsLength; i++) {
                var splitArray = permissions[i].split(" ");
                if (splitArray['length'] !== 2) return res.status(400).json({ status: 400, message: "your permissions is not valid.", example: " please give like this :- 'post http://www.example.com/apiendpoints'" });
                if (!splitArray instanceof Array) return res.status(400).json({ status: 400, message: "Please enter correct permissions like [httpMethods endpoints].", example: " please give like this :- 'post http://www.example.com/apiendpoints'" });
                else {
                    var checkHttp = splitArray[0].toLowerCase();
                    if (checkHttp !== 'get' && checkHttp !== 'post' && checkHttp !== ' put'
                        && checkHttp !== "delete" && checkHttp !== 'patch')
                        return res.status(400).json({ status: 400, message: "your permissions is not valid.", example: " please give like this :- 'post http://www.example.com/apiendpoints'" });
                    else {
                        custom.push(permissions[i].toLowerCase());
                    }
                }
            }
            req['body']['permissions'] = custom;
            req['body']['scopeNumber'] = scope;
            await scopeModel.find({ scopeNumber: scope }, (error, foundScope) => {
                if (error) return res.status(401).json({ status: 401, message: "Error in getting acces-token scope permission.", error: error });
                else if (foundScope.length === 1) {
                    req.isScopeExists = foundScope[0];
                    return next();
                }
                else {
                    req.isScopeExists = false;
                    return next();
                }
            });
        }
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Error in finding", error: error });
    }
}
/****************************************END*************************************/


// Exporting Scope Middleware.
return module.exports = {

    getScopesByScopeNumber: getScopesByScopeNumber,
    isScopeFieldsValid: isScopeFieldsValid,
    scopeCheck: scopeCheck,

}
/****************************************END*************************************/