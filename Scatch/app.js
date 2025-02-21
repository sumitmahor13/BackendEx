const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session")
const flash = require("connect-flash");
const db = require("./config/mongooseConnection")
const usersRouter = require("./routes/usersRouter")
const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({resave:false, saveUninitialized:false, secret:process.env.EXPRESS_SESSION_SECRET,}))
app.use(flash())

//Route
app.use("/users", usersRouter)
app.use("/owners", ownersRouter)
app.use("/products", productsRouter)

app.listen("3000", (req, res)=>{
    console.log("Running")
})