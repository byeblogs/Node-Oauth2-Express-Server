// 'use strict';

// const scopeModel = require('../models/scope_access_token');

// exports.preventScopeOfSameName = async (req,res,next)=>{
//     try {
//         
//         const scopeNumber = req['body']['scopeNumber'];
//         const permissions = req['body']['permissions'].length;
//         if(!scopeNumber || scopeNumber == '' || !permissions || permissions ==0)
//         return res.status(401).json({status:401 , message:"All fields are required"});
//         else {
//             scopeModel.find({scopeNumber:scopeNumber},(error,foundScope)=>{
//                 
//                 if(error) return res.status(401).json({status:401 , message:"Error in finding"});
//                 else if(foundScope.length === 1) return res.status(201).json({status:201 , message:"Scope name already exist"});
//                 else return next();
//             })
//         }
//     } catch (error) {
//         return res.status(401).json({status:401 , message:"Error in finding"});
//     }
// }