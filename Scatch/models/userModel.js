const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        maxLength:50,
        minLength:3,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type:Array,
        default:[],
    },
    order:{
        type:Array,
        default:[],
    },
    picture:{
        type:String,
    }
})

module.exports = mongoose.model("user", userSchema)