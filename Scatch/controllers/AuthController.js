const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async(req, res) => {
  try {
    //destructuring data from req body
    let { fullname, email, password } = req.body;

    //check user already exists or not 
    let user = await userModel.findOne({email:email})
    if(user) return res.status(400).send("You already have an account")

    //hash the password then create user
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        } else {
          // user creation
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          //set token in cookie
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user created successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
}; 

module.exports.loginUser = async(req, res) => {
  try {
    //destructuring data from req body
    let {email, password} = req.body;
    console.log(email, password)
    //check user registered or not
    let user = await userModel.findOne({email:email})
    if(!user) return res.status(404).send("Please Register Yourself")

    bcrypt.compare(password, user.password, (err, result)=>{
      if(result){
        let token = generateToken(user);
        res.cookie("token", token)
        res.status(200).send("You are Login")
      }else{
        res.status(401).send("Incorrect email or password")
      }
    })

  } catch (error) {
    console.log(err.message)
  }
}

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/")
}