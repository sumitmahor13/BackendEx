const express = require("express");
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async(req, res) =>{
    try {
        //fetch file from req
        const file = req.files.file;
        console.log(`YOUR FILE IS =>`, file);

        //path
        const path = __dirname + "/files" + Date.now() + `.${file.name.split(".")[1]}`

        //move file from req to path
        file.mv(path, (error)=>{
            console.log(error);
        });

        res.json({
            success:true,
            message:"File Uploaded at server Successfully !"
        })

    } catch (error) {
        res.json({
            success:false,
            message:"Failure in file uploadation"
        })
    }
}


//image Upload Handler

function isFileTypeSupported(fileType, supportedTypes ) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder};
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}


exports.imageUpload = async(req, res) => {
    try {
        //data fetch 
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("FileType", fileType)

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File Format Not Supported !"
            })
        }

        //If fileType Supported

        const response = await uploadFileToCloudinary(file, "SumiiAssets");
        console.log(response);

        //entry save in Database
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url,
        })

        //success flag
        return res.status(200).json({
            success:true,
            message:"Image successfully Uploaded to Cloudinary"
        })


    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong.."
        })
    }
}

//video upload Handler

exports.videoUpload = async(req, res) => {
    try {
        //data fetch 
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("FileType", fileType)

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File Format Not Supported !"
            })
        }

        //If fileType Supported

        const response = await uploadFileToCloudinary(file, "SumiiAssets");
        console.log(response);

        //entry save in Database
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url,
        })

        //success flag
        return res.status(200).json({
            success:true,
            message:"Video successfully Uploaded to Cloudinary"
        })


    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong.."
        })
    }
}