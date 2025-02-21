const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image:{
        type:Buffer,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default:0,
    },
    bgColor:{
        type:String,
        required:true,
    },
    paneColor:{
        type:String,
        required:true,
    },
    textColor:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("product", productSchema)