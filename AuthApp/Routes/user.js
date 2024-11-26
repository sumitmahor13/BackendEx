const express = require("express")
const router = express.Router();

const {login, signUp} = require("../Controllers/auth");
const {auth, isAdmin, isStudent} = require("../Middleware/AuthMIddleware")

router.post("/login", login);
router.post("/signup", signUp);

//testing protected route for single middleware
router.get("/test", auth, (req, res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for test"
    })
})

//protected routes
router.get("/student",auth,isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for Student"
    })
})

router.get("/admin",auth,isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for admin"
    })
})

module.exports = router;