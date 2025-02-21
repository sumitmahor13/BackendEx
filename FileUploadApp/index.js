// Server Intentiate & app creation 
const express = require("express");
const app = express();

//Define port 
require("dotenv").config();
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//mounting
const upload = require("./Routes/fileUploadRoutes");
app.use("/api/v1/upload", upload);

//database connection
const DB = require("./Config/database")
DB.dbConnect();

//Cloudinary Connection
const Cloudinary = require("./Config/cloudinary")
Cloudinary.cloudinary();

//Start the server
app.listen(PORT, ()=>{
    console.log(`App is successfully running on port- ${PORT}`)
})