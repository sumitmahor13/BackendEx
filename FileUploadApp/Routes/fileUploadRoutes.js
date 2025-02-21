//instance of express & router creation
const express = require("express");
const router = express.Router();

//import routes handler
const {localFileUpload, imageUpload, videoUpload} = require("../Controllers/fileUpload");

// route Handler
router.post("/localfileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload",videoUpload);

module.exports = router;