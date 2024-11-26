const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) =>{
    try {
        //extract token
        const token = req.body.token;
        //if token missing
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token Missing"
            })
        }

        //verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            console.log(payload)
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Somthing went wrong"
        })
    }

}



exports.isStudent = (req, res, next) =>{
    try {
        if(req.user.role !== "Student"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for student"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Role doest match"
        })
    }

}

exports.isAdmin = (req, res, next) =>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Role doest match"
        })
    }

}