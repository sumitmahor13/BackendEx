const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

require("dotenv").config();

exports.signUp = async(req,res) =>{
    try {
        //get data
        const {name,email,password,role} = req.body;
        //check user already exist or not
        const userExistance = await userModel.findOne({email});
        if(userExistance){
            return res.status(400).json({
                success: false,
                message:"User already exist",
            })
        }

        //secure password
        let hashpassword;
        try {
            hashpassword = await bcrypt.hash(password, 10);

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error in password hashing"
            })
        }

        //create entry for user
        const user = await userModel.create({
            name,
            password:hashpassword,
            email,
            role,
        })
        return res.status(200).json({
            success:true,
            message:"User entry created successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"user Cant be register, please try again later.."
        })
    }
}

//login

exports.login = async(req,res) => {
    try {
        //fetch data from req ki body
    const {email, password} = req.body;
    //validation on email and password
    if(!email || !password){
       return res.status(400).json({
            success:false,
            message:"please fill all the details carefully"
       })
    }
    //check user is registered or not ?
    const user = await userModel.findOne({email});
    //if user is not registed
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Please register yourself first!"
        })
    }

    const payload =  {
        email:user.email,
        role:user.role,       //payload 
        id:user._id,
    }

    //verify password & generate JWT token
    if(await bcrypt.compare(password, user.password)){
        //creation of token    
        let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h",})
        user.token = token;
        user.password = undefined;

        const options = {
            expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        }

        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged in Successfully"
        });
    }
    else{
        return res.status(403).json({
            success:false,
            message:"incorrect password !"
        })
    }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Login Failure"
        })
    }
    

}