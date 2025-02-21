const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{console.log("DB Connected Succesfully")})
    .catch((error)=>{
        console.log("DB Connection Failed..")
        console.error(error.message)
        process.exit(1);
    })
}