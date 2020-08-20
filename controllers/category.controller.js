'use strict'

// Importing required modules.
const categoryModel = require('../models/category.model');


/****************************************************
 * Create category API.                             *
 ****************************************************/
exports.create_category = (req, res) => {
    try {
        var category_name = req['body']['category_name'];
        var category_description = req['body']['category_description'];
        var categoryModelObj = new categoryModel({
            category_name: category_name,
            category_description: category_description
        });
        categoryModelObj.save(categoryModelObj, (error, createdCategory) => {
            if (error) return res.status(401).json({ status: 401, message: "Error in creating", error: error });
            else return res.status(200).json({ status: 200, message: "Created Successfully", data: createdCategory });
        });
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong", error: error });
    }
}
/****************************************END*************************************/