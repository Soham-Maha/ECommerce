const express = require("express");
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

//setup the cloudinary configurations
cloudinary.config({
  cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.APP_CLOUDINARY_API_KEY,
  api_secret: process.env.APP_CLOUDINARY_SECRET_KEY,
});

const uploadMultipleCloudinary = asyncHandler(async (req, res, next) => {
  try {
    const images = req.files;
    const imageUrls = [];
    for (const image of images) {
        const result = await cloudinary.uploader.upload(image.path, {
            resource_type: 'auto',
        });
        imageUrls.push(result.secure_url);
    }
    req.images = imageUrls;
    console.log(imageUrls);

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = uploadMultipleCloudinary;