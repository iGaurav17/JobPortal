const ErrorResponse = require('../utils/errorResponse');
const jwt= require('jsonwebtoken');
const User=require("../models/userModel");


//check if user is authenticated
exports.isAuthenticated = async(req, res, next)=>{
    const {token} = req.cookies;
    //Make sure that the token exists
    if(!token)
    {
        return next(new ErrorResponse('Not authorised to access this route', 401));
    }
    try {
        //Verify token
        const decoded = jwt. verify(token, process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('Not authorised to access this route', 401));
    }
}


//middleware for admin
exports.isAdmin = (req,res,next) =>{
    if(req.user.role === 0){
        return next(new ErrorResponse('Access Denied, you must be an admin', 401));
    }
    next();
}