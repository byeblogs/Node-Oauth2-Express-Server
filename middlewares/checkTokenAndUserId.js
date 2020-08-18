'use strict';

/****************************************************
 * Checks token and userId is same or not.          *
 ****************************************************/
exports.checkTokenAndUserId = (req,res,next)=>{
    try {
        const id = req['user']['id'].toString();
        const userId = req['body']['userId'];
        if (id !== userId) return res.status(404).json({ status: 404, message: "This user is not authorized with the token" });
        else if(id == userId) return next();
    } catch (error) {
        return res.status(401).json({status:401 , message:"Something wents wrong" , error:error});
    }
}
/****************************************END*************************************/