'use strict';

// Importing required modules.
const scopeModel = require('../models/scope_access_token');

/****************************************************
 * If there is not scope already registered by the  *
 * admin then it creates a new one.                 *
 * If admin creates the a scope that is already     * 
 * registered by that name then it updates that one.*                        
 ****************************************************/
exports.addScope = (req, res) => {
    try {
        
        const scope = req['body']['scopeNumber'];
        var permissions = req['body']['permissions'];
        var isArray = permissions instanceof Array;
        if(!isArray) {
            permissions = [permissions];
            console.log(permissions);
        }
        var permissionsLength = permissions['length'];
        console.log(permissionsLength);
        if (!scope || scope == '' || !permissionsLength || permissionsLength == 0)
            return res.status(401).json({ status: 401, message: "All fields are required" });
        else {
            var scopeNumber = scope.toUpperCase();
            const permissionArray = permissions;
            const custom = [];
            for (var i = 0 ; i< permissionArray['length'] ; i++){
                var splitArray = permissionArray[i].split(" ");
                if(splitArray['length'] !== 2) return res.status(400).json({status:400 , message:"your permissions is not valid." , example:" please give like this :- 'post http://www.example.com/apiendpoints'"});
                if(! splitArray instanceof Array) return res.status(400).json({status:400 , message:"Please enter correct permissions like [httpMethods endpoints]." , example:" please give like this :- 'post http://www.example.com/apiendpoints'"});
                else {
                    var checkHttp = splitArray[0].toLowerCase();
                    if( checkHttp!=='get' && checkHttp!=='post' && checkHttp!==' put'
                    && checkHttp !=="delete" && checkHttp!=='patch')
                    return res.status(400).json({status:400 , message:"your permissions is not valid." , example:" please give like this :- 'post http://www.example.com/apiendpoints'"});
                    else {
                        custom.push(permissionArray[i].toLowerCase());
                    }
                }
            }
            /** Find if the scope with the name is laready registred or not. */
            scopeModel.find({ scopeNumber: scopeNumber }, (error, foundScope) => {

                if (error) return res.status(401).json({ status: 401, message: "Error in finding" });
                else if (foundScope.length === 1) {

                    /** Updates the already registered scope with the same name. */
                    const scopeId = foundScope[0]['_id'];
                    const scopeObj = {
                        $set: {
                            scopeNumber: scopeNumber,
                            permissions: custom
                        }
                    }
                    scopeModel.update({ _id: scopeId }, scopeObj, (error, updatedScope) => {
                        if (error) return res.status(401).json({ status: 401, message: "Unsuccessfull", error: error });
                        else if (updatedScope['nModified'] == 1) return res.status(200).json({ status: 200, message: "Updated successfully" });
                        else return res.status(201).json({ status: 201, message: "Not updated" });
                    });
                }
                else {

                    /** Create a new one if not already registered. */
                    const permissionArray = permissions;
                    const custom = [];
                    permissionArray.forEach(element => {
                        custom.push(element.toLowerCase());
                    });
                    const scopeObj = new scopeModel({
                        scopeNumber: scopeNumber,
                        permissions: custom
                    });
                    scopeObj.save(scopeObj, (error, insertedScope) => {
                        if (error) return res.status(401).json({ status: 401, message: "Unsuccessfull", error: error });
                        else return res.status(200).json({ status: 200, message: "Created Successfully", data: insertedScope });
                    });
                }
            })
        }
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/
