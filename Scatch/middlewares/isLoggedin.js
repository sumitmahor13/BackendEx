const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async(req, res, next) => {
    if(!req.cookie.token){
        req.flash("error", "You need to login first");
        return res.redirect("/")
    }

    try {
       let decoded = jwt.verify(req.cookie.token, process.env.JWT_KEY);
       let user = await userModel.findOne({email:decoded.email}).select("-password")

       req.user = user;

       next();
    } catch (error) {
        req.flash("error", "Something went wrong");
        res.redirect("/")
    }
}