const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");


process.env.NODE_ENV = "development";

if (process.env.NODE_ENV === "development") {
    router.post("/create", async(req, res) => {
        const owners = await ownerModel.find();
        console.log(owners)

        if(owners.length > 0){
            return res.status(500).send("You have not permission !")
        }

        const {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
    });
}

router.get("/admin", (req, res) => {
  res.render("createProducts");
});

module.exports = router;
