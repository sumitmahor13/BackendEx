const mongoose = require("mongoose")

require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{console.log("Database Connacted Successfully...")})
    .catch((error)=>{
        console.log("Database Connection Failed...")
        console.error(error.message);
        process.exit(1);
    });
}