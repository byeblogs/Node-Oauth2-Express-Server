'user strict';

// Importing required modules.
const categoryModel = require('../models/category.model');


/****************************************************
 * Checks the category with this name is already    *    
 * registered or not.                               *
 ****************************************************/
const checkCategoryByName = async (req, res, next) => {
    try {
        var category_name = req['body']['category_name'];
        var category_description = req['body']['category_description'];
        if (!category_description || !category_name) {
            return res.json({ status: 404, msg: "All fields are required" }); is
        }
        else {
            await categoryModel.find({ category_name: category_name }, (error, foundCategory) => {
                if (error) return res.status(400).json({ status: 400, message: "Something wents wrong", error: error });
                else if (foundCategory.length === 1) return res.status(201).json({ status: 201, message: "This category name already exist." });
                else return next();
            });
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: "Something wents wrong", error: error });
    }
};
/****************************************END*************************************/


/****************************************************
 * Checks the category by product_category_id.      *
 ****************************************************/
const checkCategoryById = async (req, res, next) => {
    try {
        var category_id = req['body']['product_category_id'];
        await categoryModel.find({ _id: category_id }, (error, foundCategory) => {
            if (error) return res.status(400).json({ status: 400, message: "Check your category id.", error: error });
            else if (foundCategory.length === 1) return next();
            else res.status(201).json({ status: 404, message: "This category id does not exist exist." });
        });
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Something wents wrong.", error: error });
    }
};
/****************************************END*************************************/


// Exporting Category Middleware.
return module.exports = {

    checkCategoryByName: checkCategoryByName,
    checkCategoryById: checkCategoryById

};
/****************************************END*************************************/