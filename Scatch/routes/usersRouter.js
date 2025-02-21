const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/AuthController")

router.get("/", (req, res)=>{
    res.send("Hey its working...")
})

//Routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

module.exports = router;