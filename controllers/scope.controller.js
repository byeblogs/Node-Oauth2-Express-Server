'use strict';

// Importing required modules.
const scopeModel = require('../models/scope_access_token');


/****************************************************
 * If there is not scope already registered by the  *
 * admin then it creates a new one.                 *
 * If admin creates the a scope that is already     * 
 * registered by that name then it updates that one.*                        
 ****************************************************/
exports.addScope = async (req, res) => {
    try {
        debugger
        var isScopeExists = req['isScopeExists'];
        if (isScopeExists !== false) {

            /** Updates the already registered scope with the same name. */
            const scopeId = isScopeExists['_id'];
            const scopeObj = {
                $set: {
                    scopeNumber: req['body']['scopeNumber'],
                    permissions: req['body']['permissions']
                }
            }
            await scopeModel.update({ _id: scopeId }, scopeObj, (error, updatedScope) => {
                if (error) return res.status(401).json({ status: 401, message: "Unsuccessfull", error: error });
                else if (updatedScope['nModified'] == 1) return res.status(200).json({ status: 200, message: "Updated successfully" });
                else return res.status(201).json({ status: 201, message: "Not updated" });
            });
        }
        else if (isScopeExists === false) {

            /** Creates the  scope. */
            const scopeObj = new scopeModel({
                scopeNumber: req['body']['scopeNumber'],
                permissions: req['body']['permissions']
            });
            scopeObj.save(scopeObj, (error, insertedScope) => {
                if (error) return res.status(401).json({ status: 401, message: "Unsuccessfull", error: error });
                else return res.status(200).json({ status: 200, message: "Created Successfully", data: insertedScope });
            });
        }
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/
